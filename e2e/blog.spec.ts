import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/[^/]*posthog\.com\//, (route) =>
    route.fulfill({
      contentType: route.request().url().endsWith('.js')
        ? 'application/javascript'
        : 'application/json',
      body: route.request().url().endsWith('.js') ? '' : JSON.stringify({ featureFlags: {} }),
    }),
  );
});

test('renders an article and its metadata after client navigation', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/blog');
  await page.locator('a[href="/blog/automating-the-boring-part-of-studying"]').click();
  await expect(page).toHaveURL('/blog/automating-the-boring-part-of-studying');
  await expect(page.locator('article h1')).toContainText('Automating the Boring Part of Studying');
  await expect(page).toHaveTitle(/Automating the Boring Part of Studying/);
  // Dev HMR can retain prior head tags; verify the canonical on a document load.
  await page.reload();
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://eduardocouto.dev/blog/automating-the-boring-part-of-studying',
  );
  expect(errors).toEqual([]);
});

test('returns 404 for an unknown article', async ({ page }) => {
  const response = await page.goto('/blog/non-existent-post');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('404');
});

test('loads the hero portrait at its configured quality', async ({ page }) => {
  await page.goto('/');
  const portrait = page.getByRole('img', { name: 'Eduardo Couto Portrait' });
  await expect(portrait).toBeVisible();
  await expect
    .poll(() =>
      portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  const source = await portrait.evaluate((image: HTMLImageElement) => image.currentSrc);
  expect(new URL(source).searchParams.get('q')).toBe('90');
  expect((await page.request.get(source)).status()).toBe(200);
});
