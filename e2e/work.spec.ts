import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route(/https:\/\/[^/]*posthog\.com\//, (route) =>
    route.fulfill({ contentType: 'application/json', body: '{}' }),
  );
});

test('discovers relevant work and navigates between shareable views', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('link', { name: 'Find relevant work' }).click();
  await expect(page).toHaveURL('/work/ai');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'AI that connects to real software.',
  );
  await expect(page.getByRole('link', { name: 'Java AI Coding Agent' })).toBeVisible();

  const navigation = page.getByRole('navigation', { name: 'What do you need to build?' });
  const backend = navigation.getByRole('link', { name: 'Backend systems' });
  await backend.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/work/backend');
  await expect(backend).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'HTTP Server from Scratch' })).toHaveAttribute(
    'href',
    /http-server-from-scratch$/,
  );
  await expect(page.getByRole('link', { name: 'Java AI Coding Agent' })).toHaveCount(0);

  await navigation.getByRole('link', { name: 'Websites' }).click();
  await expect(page).toHaveURL('/work/web');
  await expect(page.getByRole('link', { name: 'Aquapharma', exact: true })).toHaveAttribute(
    'href',
    'https://aquapharma.net',
  );
  await expect(page.getByRole('link', { name: 'Email me about websites' })).toHaveAttribute(
    'href',
    "mailto:contacts@eduardocouto.dev?subject=Let's%20talk%20about%20websites",
  );
  await page.goBack();
  await expect(page).toHaveURL('/work/backend');
  await page.goForward();
  await expect(page).toHaveURL('/work/web');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A website with a job to do.');
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('direct links expose unique metadata and contact navigation', async ({ page }) => {
  await page.goto('/work/backend');
  await expect(page).toHaveTitle(/Backend systems — Selected work/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://eduardocouto.dev/work/backend',
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://eduardocouto.dev/work/backend',
  );
  await page.getByRole('link', { name: 'Prefer a contact form?' }).click();
  await expect(page).toHaveURL('/#contact');
  await expect(page.getByTestId('contact-name-input')).toBeVisible();
});

test('unknown work focus returns 404', async ({ page }) => {
  const response = await page.goto('/work/unknown');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('404');
});

test('work guide stays usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/work/ai');
  await page
    .getByRole('navigation', { name: 'What do you need to build?' })
    .getByRole('link', { name: 'Websites' })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('A website with a job to do.');
  await expect(page.getByRole('link', { name: 'Email me about websites' })).toBeVisible();
  await context.close();
});
