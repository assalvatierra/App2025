/**
 * contacts-list.spec.js
 *
 * Tests for the Organization > Contacts page (/contacts):
 *  1. Navigate to Organization > Contacts via the sidebar after login.
 *  2. Verify the page heading reads "Contacts".
 *  3. Verify the expected column headers are present.
 *  4. Verify at least one contact row is loaded in the table.
 *  5. Verify the pagination label shows a non-zero record count.
 *  6. Take a full-page screenshot of the loaded contact list.
 */

const path = require('path');
const fs   = require('fs');
const { test, expect } = require('./fixtures');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_URL      = 'https://localhost:51099';
const CONTACTS_URL  = `${BASE_URL}/contacts`;

/** Expected column headers (order-independent). */
const EXPECTED_COLUMNS = ['ID', 'Name', 'Contact No 1', 'Email 1', 'Active', 'Archived'];

// ---------------------------------------------------------------------------
// Screenshot helper
// ---------------------------------------------------------------------------

const SCREENSHOT_DIR = path.join(__dirname, '..', 'test-results', 'screenshots');

/**
 * Saves a full-page PNG to test-results/screenshots/<filename>.png
 * and logs the path to the console.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} filename  – without extension
 */
async function saveScreenshot(page, filename) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  const filePath = path.join(SCREENSHOT_DIR, `${filename}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`[screenshot] Saved → ${filePath}`);
}

/**
 * Returns a filename-safe timestamp string, e.g. "2026-04-05_14-32-07".
 */
function filenameTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  return `${date}_${time}`;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Navigates to Organization > Contacts using the sidebar.
 * Expands the "Organization" collapsible section if it is collapsed, then
 * clicks the "Contacts" link.  Falls back to a direct page.goto if the
 * sidebar link cannot be found.
 *
 * @param {import('@playwright/test').Page} page
 */
async function navigateToContacts(page) {
  // Expand the "Organization" collapsible section if not already open
  const orgToggle = page.locator('a[href="/"]').filter({ hasText: 'Organization' });
  if (await orgToggle.count() > 0) {
    const contactsLinkVisible = await page
      .locator('a[href="/contacts"]')
      .isVisible()
      .catch(() => false);

    if (!contactsLinkVisible) {
      await orgToggle.first().click();
      await page.waitForTimeout(400); // allow the expand animation to finish
    }
  }

  // Click the Contacts link
  const contactsLink = page.locator('a[href="/contacts"]');
  if (await contactsLink.count() > 0) {
    await contactsLink.first().click();
    await page.waitForLoadState('networkidle');
    return;
  }

  // Fallback: direct URL navigation
  await page.goto(CONTACTS_URL, { waitUntil: 'networkidle' });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Contacts Page', () => {

  test('should navigate to Organization > Contacts and load the contact list', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // ── Step 1: Navigate via the sidebar ─────────────────────────────────────
    await navigateToContacts(page);

    // ── Step 2: Verify the URL ────────────────────────────────────────────────
    expect(page.url()).toContain('/contacts');

    // ── Step 3: Verify the page heading ──────────────────────────────────────
    // The app renders the page title as a generic text node "Contacts" inside
    // the main content area.
    const heading = page.locator(
      'mat-card-title, h1, h2, h3, [class*="title"], [class*="heading"]'
    ).filter({ hasText: /^Contacts$/i }).first();
    await expect(heading).toBeVisible({ timeout: 10000 });

    // ── Step 4: Verify the data table is present ──────────────────────────────
    const table = page.locator('table, [role="grid"]');
    await expect(table.first()).toBeVisible({ timeout: 10000 });

    // ── Step 5: Verify expected column headers ────────────────────────────────
    for (const col of EXPECTED_COLUMNS) {
      await expect(
        page.locator(`th, [role="columnheader"]`).filter({ hasText: col }).first()
      ).toBeVisible({ timeout: 5000 });
    }

    // ── Step 6: Wait for at least one data row ────────────────────────────────
    // The table populates asynchronously; wait until the first tbody row appears.
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow).toBeVisible({ timeout: 15000 });

    // ── Step 7: Verify row count is > 0 ──────────────────────────────────────
    const rowCount = await page.locator('tbody tr').count();
    expect(
      rowCount,
      `Expected at least one contact row in the table but found ${rowCount}`
    ).toBeGreaterThan(0);

    // ── Step 8: Verify the pagination label shows a non-zero total ────────────
    // The paginator renders text like "1 – 10 of 42" or "1 – 2 of 2".
    const pagerText = await page
      .locator('.mat-mdc-paginator-range-label, [class*="paginator"] [class*="range"]')
      .first()
      .textContent()
      .catch(() => '');

    // Must NOT be "0 of 0"
    expect(
      pagerText.trim(),
      `Pagination label should show records but got "${pagerText.trim()}"`
    ).not.toBe('0 of 0');

    // Must contain a number (e.g. "1 – 2 of 2")
    expect(
      /\d/.test(pagerText),
      `Pagination label "${pagerText.trim()}" should contain a number`
    ).toBe(true);

    // ── Step 9: Verify the Actions button is present on the first row ─────────
    // Each row has an "Actions" menu button (mat-menu-trigger) for row actions.
    const actionsBtn = page.locator('tbody tr:first-child button').filter({ hasText: /Actions/i });
    await expect(actionsBtn).toBeVisible({ timeout: 5000 });

    // ── Step 10: Screenshot of the loaded contact list ────────────────────────
    await saveScreenshot(page, `contacts-list_${filenameTimestamp()}`);
  });

});
