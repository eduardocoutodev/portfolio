import { expect, Page, test } from '@playwright/test';
import { gunzipSync } from 'zlib';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Run against a dev server started with NEXT_PUBLIC_NODE_ENV=production.
// PostHog requests and email submissions are intercepted; nothing is sent externally.
test.describe('PostHog analytics', () => {
  test.skip(process.env.NEXT_PUBLIC_NODE_ENV !== 'production', 'Requires analytics enabled');

  test.use({
    contextOptions: { reducedMotion: 'reduce' },
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  });

  let events: { event: string; properties: Record<string, unknown> }[];

  async function gotoReady(page: Page, url: string) {
    const pageviews = events.filter((event) => event.event === '$pageview').length;
    await page.goto(url);
    // The responsive header only renders after its mount effect; pageviews now precede hydration.
    await expect(page.locator('header')).toBeAttached();
    if (url.startsWith('/#')) return;
    // Wait for SDK initialization before interacting after a full navigation.
    await expect
      .poll(() => events.filter((event) => event.event === '$pageview').length, { timeout: 10000 })
      .toBeGreaterThan(pageviews);
  }

  test.beforeEach(async ({ page }) => {
    events = [];
    // The SDK excludes automated browsers. Emulate a visitor only in these tests.
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
      Object.defineProperty(navigator, 'userAgentData', { get: () => undefined });
    });
    await page.route(/https:\/\/[^/]*posthog\.com\//, async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const body = request.postDataBuffer();
      const extension = path.basename(url.pathname);
      if (/^(exception-autocapture|web-vitals)(\..+)?\.js$/.test(extension)) {
        await route.fulfill({
          contentType: 'application/javascript',
          body: await readFile(path.join(process.cwd(), 'node_modules/posthog-js/dist', extension)),
        });
        return;
      }
      // WebKit may omit the body of sendBeacon requests during page unload.
      if (/\/e\/?$/.test(url.pathname) && body) {
        const payload = JSON.parse(
          url.searchParams.get('compression') === 'gzip-js'
            ? gunzipSync(body).toString()
            : body.toString(),
        );
        events.push(...(Array.isArray(payload) ? payload : [payload]));
      }
      await route.fulfill({
        contentType: url.pathname.endsWith('.js') ? 'application/javascript' : 'application/json',
        body: url.pathname.endsWith('.js') ? '' : JSON.stringify({ featureFlags: {} }),
      });
    });
    await gotoReady(page, '/');
  });

  test('captures uncaught errors and unhandled rejections', async ({ page }) => {
    await expect
      .poll(() => page.evaluate(() => typeof window.onerror), { timeout: 10000 })
      .toBe('function');
    await page.evaluate(() => {
      setTimeout(() => {
        throw new Error('Analytics test uncaught error');
      }, 0);
      void Promise.reject(new Error('Analytics test unhandled rejection'));
    });
    await expect
      .poll(
        () =>
          events
            .filter((event) => event.event === '$exception')
            .map((event) => JSON.stringify(event.properties.$exception_list)),
        { timeout: 15000 },
      )
      .toEqual(
        expect.arrayContaining([
          expect.stringContaining('Analytics test uncaught error'),
          expect.stringContaining('Analytics test unhandled rejection'),
        ]),
      );
  });

  test('captures contact form starts once without field values', async ({ page }) => {
    await gotoReady(page, '/#contact');
    await page.getByTestId('contact-name-input').fill('Analytics Private Name');
    await page.getByTestId('contact-email-input').fill('private-analytics@example.com');
    await page.getByTestId('contact-message-input').fill('Private analytics message');
    await expect
      .poll(() => events.filter((event) => event.event === 'CONTACT_FORM_STARTED').length, {
        timeout: 10000,
      })
      .toBe(1);
    const starts = events.filter((event) => event.event === 'CONTACT_FORM_STARTED');
    expect(starts[0]?.properties.source).toBe('contact_section');
    expect(JSON.stringify(events)).not.toContain('private-analytics@example.com');
    expect(JSON.stringify(events)).not.toContain('Private analytics message');
    expect(JSON.stringify(events)).not.toContain('Analytics Private Name');
  });

  test('reports React boundary errors and offers recovery', async ({ page }) => {
    await page.route('**/*', async (route) => {
      if (!route.request().headers()['next-action']) return route.fallback();
      await route.abort('failed');
    });
    await gotoReady(page, '/#contact');
    await page.getByTestId('contact-name-input').fill('Analytics Test');
    await page.getByTestId('contact-email-input').fill('analytics-test@example.com');
    await page.getByTestId('contact-message-input').fill('Testing boundary recovery.');
    await page.getByRole('button', { name: 'Submit', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: 'Something went wrong', exact: true }),
    ).toBeVisible();
    await expect
      .poll(
        () =>
          events.filter(
            (event) =>
              event.event === '$exception' && event.properties.source === 'react_error_boundary',
          ).length,
        { timeout: 10000 },
      )
      .toBe(1);
    await page.getByRole('button', { name: 'Try again', exact: true }).click();
    await expect(page.getByTestId('contact-name-input')).toBeVisible();
  });

  test('captures web vitals', async () => {
    await expect
      .poll(() => events.some((event) => event.event === '$web_vitals'), { timeout: 15000 })
      .toBe(true);
  });

  test('captures page exits', async ({ page, browserName }) => {
    test.skip(
      browserName === 'webkit',
      'WebKit request interception does not expose beacon bodies',
    );
    // Exercise page exit without destroying the document before the beacon can be inspected.
    await page.evaluate(() =>
      window.dispatchEvent(new Event('onpagehide' in window ? 'pagehide' : 'unload')),
    );
    await expect
      .poll(() => events.some((event) => event.event === '$pageleave'), { timeout: 10000 })
      .toBe(true);
  });

  test('captures pageviews after client-side navigation', async ({ page, isMobile }) => {
    await expect
      .poll(() => events.filter((event) => event.event === '$pageview').length, { timeout: 10000 })
      .toBe(1);
    if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
    await page
      .getByTestId(
        isMobile ? 'mobile-menu-expanded-options-container' : 'desktop-menu-options-container',
      )
      .locator('a[href="/blog"]')
      .click();
    await expect(page).toHaveURL(/\/blog$/);
    await expect
      .poll(
        () =>
          events
            .filter((event) => event.event === '$pageview')
            .map((event) => new URL(event.properties.$current_url as string).pathname),
        { timeout: 10000 },
      )
      .toEqual(['/', '/blog']);
    expect(events.filter((event) => event.event === 'NAVIGATED_SECTION')).toHaveLength(1);
    expect(events.find((event) => event.event === 'NAVIGATED_SECTION')?.properties).toMatchObject({
      section: 'Blog',
      source: isMobile ? 'mobile_menu' : 'desktop_header',
    });
  });

  for (const source of ['home', 'blog']) {
    test(`captures article clicks from ${source}`, async ({ page }) => {
      if (source === 'blog') await gotoReady(page, '/blog');
      const slug = 'automating-the-boring-part-of-studying';
      const articleLink = page.locator(`a[href="/blog/${slug}"]`).first();
      await articleLink.scrollIntoViewIfNeeded();
      await expect(articleLink).toBeInViewport();
      await articleLink.click();
      await expect(page).toHaveURL(`/blog/${slug}`);
      await expect
        .poll(
          () =>
            events
              .filter((event) => event.event === 'OPENED_BLOG_POST')
              .map((event) => ({
                article_slug: event.properties.article_slug,
                source: event.properties.source,
              })),
          { timeout: 10000 },
        )
        .toEqual([{ article_slug: slug, source }]);
    });
  }

  test('attributes project clicks to AI, backend, and web', async ({ page }) => {
    const projects = [
      { href: 'https://github.com/eduardocoutodev/llm-agent-java', category: 'ai' },
      { href: 'https://github.com/eduardocoutodev/http-server-from-scratch', category: 'backend' },
      { href: 'https://aquapharma.net', category: 'web' },
    ];
    for (const { href } of projects) {
      const link = page.locator(`#projects a[href="${href}"]`);
      // Keep the test on the portfolio while exercising the actual click handler.
      await link.evaluate((element) =>
        element.addEventListener('click', (event) => event.preventDefault()),
      );
      await link.click();
    }
    await expect
      .poll(
        () =>
          events
            .filter((event) => event.event === 'CHECKED_PROJECT')
            .map((event) => ({
              destination: event.properties.destination,
              category: event.properties.project_category,
              source: event.properties.source,
            })),
        { timeout: 10000 },
      )
      .toEqual(
        projects.map(({ href, category }) => ({ destination: href, category, source: 'projects' })),
      );
  });

  test('attributes email contact clicks without sending email', async ({ page }) => {
    for (const selector of ['#contact a[href^="mailto:"]', 'footer a[href^="mailto:"]']) {
      const link = page.locator(selector);
      await link.evaluate((element) =>
        element.addEventListener('click', (event) => event.preventDefault()),
      );
      await link.click();
    }
    await expect
      .poll(
        () =>
          events
            .filter((event) => event.event === 'EMAIL_CONTACT_CLICKED')
            .map((event) => event.properties.source),
        { timeout: 10000 },
      )
      .toEqual(['contact_section', 'footer']);
  });

  test('does not capture invalid contact submissions', async ({ page }) => {
    let actionRequests = 0;
    page.on('request', (request) => {
      if (request.headers()['next-action']) actionRequests++;
    });
    await gotoReady(page, '/#contact');
    await page.getByTestId('contact-name-input').fill('J');
    await page.getByTestId('contact-email-input').fill('analytics-test@example.com');
    await page.getByRole('button', { name: 'Submit', exact: true }).click();
    await expect(page.getByTestId('invalid-name-warning')).toBeVisible();
    await expect(page.getByTestId('invalid-message-warning')).toBeVisible();
    await expect
      .poll(() => events.some((event) => event.event === '$autocapture'), { timeout: 10000 })
      .toBe(true);
    expect(actionRequests).toBe(0);
    expect(events.filter((event) => event.event === 'SUBMITED_CONTACT_FORM')).toEqual([]);
  });

  for (const success of [true, false]) {
    test(`captures contact submission only after acceptance: ${success}`, async ({ page }) => {
      let respond!: () => void;
      const responseGate = new Promise<void>((resolve) => {
        respond = resolve;
      });
      let actionRequested!: () => void;
      const actionRequest = new Promise<void>((resolve) => {
        actionRequested = resolve;
      });
      await page.route('**/*', async (route) => {
        if (!route.request().headers()['next-action']) return route.fallback();
        actionRequested();
        await responseGate;
        await route.fulfill({
          contentType: 'text/x-component',
          body: `0:{"a":"$@1","f":"","b":"development"}\n1:${JSON.stringify(success ? { success: true } : { error: 'Submission rejected' })}\n`,
        });
      });

      await gotoReady(page, '/#contact');
      await page.getByTestId('contact-name-input').fill('Analytics Test');
      await page.getByTestId('contact-email-input').fill('analytics-test@example.com');
      await page.getByTestId('contact-message-input').fill('Testing contact analytics.');
      await page.getByRole('button', { name: 'Submit', exact: true }).click();
      await actionRequest;
      expect(events.filter((event) => event.event === 'SUBMITED_CONTACT_FORM')).toEqual([]);
      respond();

      await expect(page.getByTestId('toast-container')).toContainText(
        success ? 'Message submitted!' : 'Something went wrong.',
      );
      // Wait for the SDK batch containing the submit-button autocapture to flush.
      await expect
        .poll(() => events.some((event) => event.event === '$autocapture'), { timeout: 10000 })
        .toBe(true);
      await expect
        .poll(() => events.filter((event) => event.event === 'SUBMITED_CONTACT_FORM').length, {
          timeout: 10000,
        })
        .toBe(success ? 1 : 0);
      await expect
        .poll(() => events.filter((event) => event.event === 'CONTACT_FORM_FAILED').length, {
          timeout: 10000,
        })
        .toBe(success ? 0 : 1);
      const contactEvents = events.filter((event) => event.event === 'SUBMITED_CONTACT_FORM');
      if (success) expect(contactEvents[0]?.properties.submission_status).toBe('accepted');
      expect(JSON.stringify(contactEvents)).not.toContain('analytics-test@example.com');
      expect(JSON.stringify(contactEvents)).not.toContain('Testing contact analytics.');
    });
  }
});
