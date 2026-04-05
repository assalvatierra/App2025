/**
 * payment-release.spec.js
 *
 * Tests for the Cash > Payments page (/payments?mode=RELEASE).
 *
 *  1. Navigate to Cash > Payments (Release) via the sidebar.
 *  2. Verify the list page loads (URL contains mode=RELEASE).
 *  3. Click "+ Add Payment".
 *  4. Verify the Add Payment form opens.
 *  5. Check that the form's mode toggle reflects the same mode as the list
 *     (toggle is OFF / aria-checked="false" = Release mode, matching mode=RELEASE).
 *  6. Verify the Item Type hint confirms the correct mode
 *     ("Available types for Release: OPEX, JOBEX, GENEX").
 *  7. Take screenshots – one of the open form, one after returning to the list.
 */

const path = require('path');
const fs   = require('fs');
const { test, expect } = require('./fixtures');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_URL       = 'https://localhost:51099';
const RELEASE_URL    = `${BASE_URL}/payments?mode=RELEASE`;
const EXPECTED_MODE  = 'RELEASE';

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
 * then clicks the "Payments" link (href="/payments?mode=RELEASE").
 */
async function navigateToPaymentsRelease(page) {
  // Expand the Cash section if collapsed
  const cashToggle = page.locator('a[href="/"]').filter({ hasText: 'Cash' });
  if (await cashToggle.count() > 0) {
    const releaseVisible = await page
      .locator('a[href="/payments?mode=RELEASE"]')
      .isVisible()
      .catch(() => false);

    if (!releaseVisible) {
      await cashToggle.first().click();
      await page.waitForTimeout(400);
    }
  }

  // Click the Payments (Release) link
  const releaseLink = page.locator('a[href="/payments?mode=RELEASE"]');
  if (await releaseLink.count() > 0) {
    await releaseLink.first().click();
    await page.waitForLoadState('networkidle');
    return;
  }

  // Fallback: direct navigation
  await page.goto(RELEASE_URL, { waitUntil: 'networkidle' });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Payment Release Page', () => {

  // ── Test 1: Payments list loads with RELEASE mode ────────────────────────
  test('should navigate to Payments and load the list in RELEASE mode', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await navigateToPaymentsRelease(page);

    // URL must contain mode=RELEASE
    expect(
      page.url(),
      'Expected URL to contain "mode=RELEASE" after navigating to Payments'
    ).toContain('mode=RELEASE');

    // Page heading "Payments" must be visible
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

  // ── Test 2: Add Payment form mode matches the list RELEASE mode ───────────
  test('should open Add Payment form with mode toggle matching the list RELEASE mode', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // ── Step 1: Navigate to Payments (mode=RELEASE) ───────────────────────
    await navigateToPaymentsRelease(page);

    // Capture the mode from the URL query string
    const listUrl  = new URL(page.url());
    const listMode = (listUrl.searchParams.get('mode') || '').toUpperCase();

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
    const formHeading = page.locator('mat-card-title, h2, h3')
      .filter({ hasText: 'Add Payment' })
      .first();
    await expect(formHeading).toBeVisible({ timeout: 8000 });

    // ── Step 4: Find the mode slide-toggle ────────────────────────────────
    // The toggle is a <button role="switch"> inside a mat-slide-toggle.
    // aria-checked="true"  → Receipt mode (RECEIPT)
    // aria-checked="false" → Release mode (RELEASE)
    const modeToggle = page.locator('button[role="switch"]');
    await expect(modeToggle).toBeVisible({ timeout: 8000 });

    const ariaChecked = await modeToggle.getAttribute('aria-checked');

    // ── Step 5: Verify the toggle label reads "Release" ───────────────────
    // When aria-checked="false" the label next to the toggle reads "Release".
    const toggleLabel = page.locator('label.mdc-label').filter({ hasText: 'Release' });
    await expect(toggleLabel).toBeVisible({ timeout: 5000 });

    // ── Step 6: Verify the mode-hint text ─────────────────────────────────
    // When in Release mode the hint reads "← Switch to Receipt mode"
    const modeHint = page.locator('span.mode-hint');
    await expect(modeHint).toBeVisible({ timeout: 5000 });
    await expect(modeHint).toContainText('Receipt mode');

    // ── Step 7: Cross-check – form mode must match list mode ──────────────
    // List mode=RELEASE  →  toggle aria-checked must be "false"
    const expectedToggleState = listMode === 'RECEIPT' ? 'true' : 'false';
    expect(
      ariaChecked,
      `Form toggle aria-checked="${ariaChecked}" does not match list mode="${listMode}". ` +
      `Expected aria-checked="${expectedToggleState}"`
    ).toBe(expectedToggleState);

    // ── Step 8: Verify the Item Type hint shows correct available types ────
    // In Release mode the hint reads:
    // "Available types for Release: OPEX, JOBEX, GENEX"
    const itemTypeHint = page.locator('mat-hint').filter({ hasText: /available types/i });
    await expect(itemTypeHint).toBeVisible({ timeout: 5000 });
    await expect(itemTypeHint).toContainText('Release');
    await expect(itemTypeHint).toContainText('OPEX');
    await expect(itemTypeHint).toContainText('JOBEX');
    await expect(itemTypeHint).toContainText('GENEX');

    // ── Screenshot 1: form with all assertions passed ─────────────────────
    await saveScreenshot(page, `payment-release-add-form_${filenameTimestamp()}`);

    // ── Step 9: Cancel / close the form ───────────────────────────────────
    const cancelBtn = page.locator('button').filter({ hasText: 'Cancel' });
    if (await cancelBtn.count() > 0) {
      await cancelBtn.first().click();
      await page.waitForTimeout(400);
    }

    // List table must still be visible after closing the form
    const table = page.locator('table, [role="grid"]');
    await expect(table.first()).toBeVisible({ timeout: 8000 });

    // ── Screenshot 2: back on the list after closing the form ─────────────
    await saveScreenshot(page, `payment-release-list-after-cancel_${filenameTimestamp()}`);
  });

});
