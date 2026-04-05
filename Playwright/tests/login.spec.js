/**
 * login.spec.js
 *
 * Verifies the login flow end-to-end.
 * The shared `authenticatedPage` fixture (defined in fixtures.js) handles
 * navigating to the login page, filling credentials, and submitting.
 * All future tests that need an authenticated session should import from
 * './fixtures' and use `authenticatedPage` instead of `page`.
 */
const { test, expect } = require('./fixtures');

test('login navigates away and shows Logout', async ({ authenticatedPage }) => {
  // The fixture already performed the login; we just assert the outcome.
  const page = authenticatedPage;

  // Logout button must be visible
  await expect(page.locator('text=Logout')).toBeVisible({ timeout: 10000 });

  // URL must no longer contain '/login'
  expect(page.url()).not.toContain('/login');
});
