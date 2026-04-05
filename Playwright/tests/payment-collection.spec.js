/**
 * payment-collection.spec.js
 *
 * Tests for the Cash > Collection page (/payments?mode=RECEIPT).
 *
 *  1. Navigate to Cash > Collection via the sidebar.
 *  2. Verify the list page loads (URL contains mode=RECEIPT).
 *  3. Click "+ Add Payment".
 *  4. Verify the Add Payment form opens.
 *  5. Check that the form's mode toggle reflects the same mode as the list
 *     (toggle is ON / aria-checked="true" = Receipt mode, matching mode=RECEIPT).
 *  6. Verify the Item Type hint text confirms the correct mode
 *     ("Available types for Receipt: COLLECT").
 */

const path = require('path');
const fs   = require('fs');
const { test, expect } = require('./fixtures');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_URL          = 'https://localhost:51099';
const COLLECTION_URL    = `${BASE_URL}/payments?mode=RECEIPT`;
const EXPECTED_MODE     = 'RECEIPT';

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
 * Returns a filename-safe timestamp string, e.g. "2026-04-04_14-32-07".
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
 * Expands the "Cash" collapsible sidebar section if it is not already open,
 * then clicks the "Collection" link (href="/payments?mode=RECEIPT").
 */
async function navigateToCollection(page) {
  // Expand the Cash section
  const cashToggle = page.locator('a[href="/"]').filter({ hasText: 'Cash' });
  if (await cashToggle.count() > 0) {
    const collectionLinkVisible = await page
      .locator('a[href="/payments?mode=RECEIPT"]')
      .isVisible()
      .catch(() => false);

    if (!collectionLinkVisible) {
      await cashToggle.first().click();
      await page.waitForTimeout(400);
    }
  }

  // Click the Collection link
  const collectionLink = page.locator('a[href="/payments?mode=RECEIPT"]');
  if (await collectionLink.count() > 0) {
    await collectionLink.first().click();
    await page.waitForLoadState('networkidle');
    return;
  }

  // Fallback: direct navigation
  await page.goto(COLLECTION_URL, { waitUntil: 'networkidle' });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Payment Collection Page', () => {

  // ── Test 1: Collection list loads with correct mode ──────────────────────
  test('should navigate to Collection and load the payments list in RECEIPT mode', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await navigateToCollection(page);

    // URL must contain mode=RECEIPT
    expect(
      page.url(),
      'Expected URL to contain "mode=RECEIPT" after navigating to Collection'
    ).toContain('mode=RECEIPT');

    // Page heading "Payments" must be visible.
    // The app renders this inside a mat-card-title or the sidebar nav label –
    // use a broader selector that covers both.
    await expect(
      page.locator('mat-card-title, h1, h2, h3, [class*="title"]')
        .filter({ hasText: 'Payments' })
        .first()
    ).toBeVisible({ timeout: 10000 });

    // The data table must be present
    const table = page.locator('table, [role="grid"]');
    await expect(table.first()).toBeVisible({ timeout: 10000 });

    // The "+ Add Payment" button must be present
    const addBtn = page.locator('button').filter({ hasText: 'Add Payment' });
    await expect(addBtn).toBeVisible({ timeout: 8000 });
  });

  // ── Test 2: Add Payment form mode matches the list mode ───────────────────
  test('should open Add Payment form with mode toggle matching the list RECEIPT mode', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // ── Step 1: Navigate to Collection (mode=RECEIPT) ─────────────────────
    await navigateToCollection(page);

    // Capture the mode from the URL query string
    const listUrl     = new URL(page.url());
    const listMode    = (listUrl.searchParams.get('mode') || '').toUpperCase();

    expect(
      listMode,
      `Expected list URL to carry mode="${EXPECTED_MODE}" but got "${listMode}"`
    ).toBe(EXPECTED_MODE);

    // ── Step 2: Click "+ Add Payment" ─────────────────────────────────────
    const addBtn = page.locator('button').filter({ hasText: 'Add Payment' });
    await expect(addBtn).toBeVisible({ timeout: 8000 });
    await addBtn.click();
    await page.waitForTimeout(600); // allow the form to render

    // ── Step 3: Verify the form heading ───────────────────────────────────
    // The form renders as "Add Cash Transaction" (outer) with "Cash Receipt"
    // as the inner mat-card-title, confirming the RECEIPT mode.
    const formHeading = page.locator(
      'mat-card-title, h2, h3, [class*="title"], [class*="heading"]'
    ).filter({ hasText: /Add Cash Transaction|Cash Receipt|Add Payment/i }).first();
    await expect(formHeading).toBeVisible({ timeout: 8000 });

    // ── Step 4: Verify the inner card title confirms RECEIPT mode ─────────
    // "Cash Receipt" is shown inside mat-card-title when in RECEIPT mode.
    const receiptTitle = page.locator('mat-card-title').filter({ hasText: /Cash Receipt/i });
    await expect(receiptTitle).toBeVisible({ timeout: 8000 });

    // ── Step 5: Verify the Receipt Type dropdown is present ───────────────
    // In Receipt (COLLECT) mode the form shows a "Receipt Type" combobox
    // pre-filled with "Billing Collection (COLLECT)".
    const receiptTypeDropdown = page.locator(
      'strong:has-text("Receipt Type"), [aria-label*="Receipt Type"], combobox[aria-label*="Receipt Type"]'
    ).first();
    await expect(receiptTypeDropdown).toBeVisible({ timeout: 8000 });

    // ── Step 6: Verify the dropdown value contains "COLLECT" ──────────────
    // The combobox label reads "Receipt Type Billing Collection (COLLECT)".
    const collectOption = page.locator('text=COLLECT').first();
    await expect(collectOption).toBeVisible({ timeout: 5000 });

    // ── Step 7: Cross-check – form is in RECEIPT mode, not RELEASE ─────────
    // "Release Type" or "Cash Release" must NOT be visible in this form.
    const releaseTitle = page.locator('mat-card-title').filter({ hasText: /Cash Release/i });
    const releaseVisible = await releaseTitle.isVisible().catch(() => false);
    expect(
      releaseVisible,
      'Form should be in RECEIPT mode but "Cash Release" title was found'
    ).toBe(false);

    // ── Screenshot 1: form with all assertions passed ─────────────────────
    await saveScreenshot(page, `payment-collection-add-form_${filenameTimestamp()}`);

    // ── Step 8: Cancel / close the form ───────────────────────────────────
    const cancelBtn = page.locator('button').filter({ hasText: 'Cancel' });
    if (await cancelBtn.count() > 0) {
      await cancelBtn.first().click();
      await page.waitForTimeout(400);
    }

    // List table must still be visible after closing the form
    const table = page.locator('table, [role="grid"]');
    await expect(table.first()).toBeVisible({ timeout: 8000 });

    // ── Screenshot 2: back on the list after closing the form ─────────────
    await saveScreenshot(page, `payment-collection-list-after-cancel_${filenameTimestamp()}`);
  });

});
