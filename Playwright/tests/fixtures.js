/**
 * fixtures.js
 *
 * Exports a custom `test` and `expect` that every spec file should import
 * instead of `@playwright/test` directly.
 *
 * Provided fixtures
 * -----------------
 * authenticatedPage – a `page` that has already completed the login flow.
 *                     Use this fixture in any test that requires an
 *                     authenticated session.
 *
 * Usage in a spec file:
 *   const { test, expect } = require('./fixtures');
 *
 *   test('some protected page', async ({ authenticatedPage }) => {
 *     await authenticatedPage.goto('/dashboard');
 *     ...
 *   });
 */

const { test: base, expect } = require('@playwright/test');

const LOGIN_URL  = 'https://localhost:51099/login';
const USERNAME   = 'admin@gmail.com';
const PASSWORD   = 'Admin123!';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const USERNAME_SELECTORS = [
  'input[name="username"]',
  'input[name="email"]',
  'input[type="email"]',
  '#username',
  '#email',
  'input[placeholder*="Email"]',
  'input[placeholder*="Username"]',
];

const PASSWORD_SELECTORS = [
  'input[name="password"]',
  'input[type="password"]',
  '#password',
  'input[placeholder*="Password"]',
];

const SUBMIT_SELECTORS = [
  'button[type="submit"]',
  'input[type="submit"]',
  'button:has-text("Log in")',
  'button:has-text("Login")',
  'button:has-text("Sign in")',
];

/**
 * Tries each selector in order; fills the first matching visible element.
 * Falls back to the first visible non-password <input> when none match.
 * @param {import('@playwright/test').Page} page
 * @param {string[]} selectors
 * @param {string} value
 * @returns {Promise<boolean>}
 */
async function fillFirst(page, selectors, value) {
  for (const sel of selectors) {
    const loc = page.locator(sel);
    if (await loc.count() > 0) {
      await loc.first().fill(value);
      return true;
    }
  }

  // Fallback: first visible input that is not a password field
  const allInputs = page.locator('input');
  const count = await allInputs.count();
  for (let i = 0; i < count; i++) {
    const input = allInputs.nth(i);
    const type = (await input.getAttribute('type')) || '';
    const isVisible = await input.isVisible().catch(() => false);
    if (!isVisible) continue;
    if (type.toLowerCase() === 'password') continue;
    try {
      await input.fill(value);
      return true;
    } catch {
      // ignore and try next
    }
  }
  return false;
}

/**
 * Performs a full login on `page` and waits for the Logout button to appear.
 * Throws (via `expect`) on any failure so the calling test is marked as failed.
 * @param {import('@playwright/test').Page} page
 */
async function login(page) {
  await page.goto(LOGIN_URL);

  const userFilled = await fillFirst(page, USERNAME_SELECTORS, USERNAME);
  expect(userFilled, 'Could not find username/email input on login page').toBeTruthy();

  const passFilled = await fillFirst(page, PASSWORD_SELECTORS, PASSWORD);
  expect(passFilled, 'Could not find password input on login page').toBeTruthy();

  let clicked = false;
  for (const sel of SUBMIT_SELECTORS) {
    const loc = page.locator(sel);
    if (await loc.count() > 0) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 5000 }).catch(() => {}),
        loc.first().click(),
      ]);
      clicked = true;
      break;
    }
  }
  expect(clicked, 'Could not find a submit button on login page').toBeTruthy();

  // Confirm success: Logout visible and URL no longer on /login
  await expect(page.locator('text=Logout')).toBeVisible({ timeout: 10000 });
  expect(page.url()).not.toContain('/login');
}

// ---------------------------------------------------------------------------
// Custom fixtures
// ---------------------------------------------------------------------------

const test = base.extend({
  // All tests that use this base already get ignoreHTTPSErrors via the fixture
  // context option below.

  /**
   * `authenticatedPage` – a page that is already logged in.
   * The fixture logs in once per test, so each test starts with a fresh
   * authenticated session.
   */
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page    = await context.newPage();
    await login(page);
    await use(page);
    await context.close();
  },
});

module.exports = { test, expect, login };
