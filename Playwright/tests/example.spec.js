const { test, expect } = require('@playwright/test');

test('homepage loads', async ({ page }) => {
  // navigates to baseURL + '/'
  const response = await page.goto('/');
  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);

  // Basic content check: page has either a title or non-empty content
  const title = await page.title().catch(() => '');
  const content = await page.content();
  expect(title !== '' || content.length > 0).toBeTruthy();
});
