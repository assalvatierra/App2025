/**
 * payment.spec.js
 *
 * Tests for the Payments page:
 *  1. Navigate to /payments after login and verify the page loads with records.
 *  2. Open the first row's "Actions" context menu and click "Edit Payment".
 *  3. Verify the edit form loads properly.
 *  4. Append the current date/time to the Remarks field.
 *  5. Submit the update.
 *  6. Take a screenshot after the successful update.
 */

const path = require('path');
const fs   = require('fs');
const { test, expect } = require('./fixtures');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns a timestamp string to append to the Remarks field,
 * e.g. " [updated: 2026-04-04 14:32:07]"
 */
function currentTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return ` [updated: ${date} ${time}]`;
}

/**
 * Builds a safe filename-friendly timestamp, e.g. "2026-04-04_14-32-07".
 */
function filenameTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  return `${date}_${time}`;
}

// Base URL for the application (matches fixtures.js LOGIN_URL origin)
const BASE_URL = 'https://localhost:51099';

/**
 * Navigates to the Payments page.
 * The Payments link is nested inside the "Cash" collapsible section of the
 * sidebar.  We expand that section first, then click the Payments link.
 * Falls back to a direct absolute URL if the sidebar approach fails.
 */
async function navigateToPayments(page) {
  // Step 1 – expand the "Cash" collapsible nav group if it is not already open
  const cashToggle = page.locator('a[href="/"]').filter({ hasText: 'Cash' });
  if (await cashToggle.count() > 0) {
    const isExpanded = await page
      .locator('a[href="/payments"]')
      .isVisible()
      .catch(() => false);

    if (!isExpanded) {
      await cashToggle.first().click();
      await page.waitForTimeout(400); // let the expand animation finish
    }
  }

  // Step 2 – click the Payments link
  const paymentsLink = page.locator('a[href="/payments"]');
  if (await paymentsLink.count() > 0) {
    await paymentsLink.first().click();
    await page.waitForLoadState('networkidle');
    return;
  }

  // Fallback: absolute URL navigation
  await page.goto(`${BASE_URL}/payments`, { waitUntil: 'networkidle' });
}

/**
 * Clicks the "Actions" button on the first table row to open its context menu,
 * then clicks the "Edit Payment" menu item.
 */
async function clickEditPaymentForFirstRow(page) {
  // Step 1 – click the Actions button in the first data row
  const actionsButton = page.locator('tbody tr:first-child button:has-text("Actions")');
  await expect(actionsButton).toBeVisible({ timeout: 10000 });
  await actionsButton.click();

  // Step 2 – click "Edit Payment" from the context / dropdown menu
  // Try menu-scoped selectors first (more precise), then fall back to bare text.
  const menuScopedItem = page.locator(
    '[role="menu"] >> text=Edit Payment, ' +
    '[role="menuitem"]:has-text("Edit Payment"), ' +
    'ul >> li:has-text("Edit Payment"), ' +
    '.dropdown-menu >> text=Edit Payment, ' +
    '.context-menu >> text=Edit Payment'
  ).first();

  const editPaymentAny = page.locator('text=Edit Payment').first();

  const isMenuItemVisible = await menuScopedItem.isVisible({ timeout: 3000 }).catch(() => false);
  if (isMenuItemVisible) {
    await menuScopedItem.click();
  } else {
    await expect(editPaymentAny).toBeVisible({ timeout: 5000 });
    await editPaymentAny.click();
  }
}

/**
 * Probes a list of selectors and returns the locator for the first visible
 * Remarks field found in the currently open form.
 * If nothing matches, logs all inputs/textareas to the console for debugging,
 * then throws a descriptive error.
 *
 * @param {import('@playwright/test').Page} page
 * @param {number} [waitMs=2000]
 * @returns {Promise<import('@playwright/test').Locator>}
 */
async function getRemarksLocator(page, waitMs = 2000) {
  const remarkSelectors = [
    // exact name attribute
    'textarea[name="remarks"]',
    'textarea[name="Remarks"]',
    'input[name="remarks"]',
    'input[name="Remarks"]',
    // id
    '#remarks',
    '#Remarks',
    // placeholder (case-insensitive)
    'textarea[placeholder*="Remark" i]',
    'input[placeholder*="Remark" i]',
    // label-adjacent / sibling
    'label:has-text("Remarks") + textarea',
    'label:has-text("Remarks") ~ textarea',
    'label:has-text("Remark") + textarea',
    'label:has-text("Remark") ~ textarea',
    'label:has-text("Remarks") + input',
    'label:has-text("Remarks") ~ input',
    'label:has-text("Remark") + input',
    'label:has-text("Remark") ~ input',
    // form-group wrappers
    '.form-group:has(label:has-text("Remark")) textarea',
    '.form-group:has(label:has-text("Remark")) input',
    '[class*="form"]:has(label:has-text("Remark")) textarea',
    '[class*="form"]:has(label:has-text("Remark")) input',
  ];

  for (const sel of remarkSelectors) {
    try {
      const loc     = page.locator(sel).first();
      const visible = await loc.isVisible({ timeout: waitMs }).catch(() => false);
      if (visible) return loc;
    } catch {
      // Invalid selector for this browser engine – skip
    }
  }

  // ── Diagnostic output ────────────────────────────────────────────────────
  const inputs = page.locator('input, textarea');
  const count  = await inputs.count();
  const found  = [];
  for (let i = 0; i < count; i++) {
    const el   = inputs.nth(i);
    const name = await el.getAttribute('name').catch(() => '');
    const id   = await el.getAttribute('id').catch(() => '');
    const ph   = await el.getAttribute('placeholder').catch(() => '');
    const tag  = await el.evaluate((n) => n.tagName.toLowerCase()).catch(() => '?');
    found.push(`  ${tag}  name="${name}"  id="${id}"  placeholder="${ph}"`);
  }
  console.error(
    `[getRemarksLocator] No visible Remarks field found.\n` +
    `Inputs / textareas in DOM at this moment:\n${found.join('\n') || '  (none)'}`
  );

  throw new Error(
    'Could not find a visible Remarks field in the payment form. ' +
    'Check the console output above for available input names/ids/placeholders ' +
    'and add the matching selector to getRemarksLocator().'
  );
}

/**
 * Waits for a visible edit form / modal / drawer after clicking "Edit Payment".
 * Returns the locator for the container, or throws if nothing appears.
 *
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<import('@playwright/test').Locator>}
 */
async function waitForEditForm(page) {
  const formSelectors = [
    '[role="dialog"]',
    '.modal-content',
    '.modal',
    '.drawer',
    '.side-panel',
    'form',
  ];

  // First pass – immediate check
  for (const sel of formSelectors) {
    const loc     = page.locator(sel).first();
    const visible = await loc.isVisible().catch(() => false);
    if (visible) return loc;
  }

  // Second pass – wait a moment for animations / lazy rendering
  await page.waitForTimeout(1500);
  for (const sel of formSelectors) {
    const loc     = page.locator(sel).first();
    const visible = await loc.isVisible().catch(() => false);
    if (visible) return loc;
  }

  throw new Error('Edit Payment form / modal did not appear after clicking "Edit Payment".');
}

// ---------------------------------------------------------------------------
// Screenshot directory
// ---------------------------------------------------------------------------

const SCREENSHOT_DIR = path.join(__dirname, '..', 'test-results', 'screenshots');

/**
 * Ensures the screenshot directory exists, then captures and saves a screenshot.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} filename  – filename without extension
 */
async function saveScreenshot(page, filename) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  const filePath = path.join(SCREENSHOT_DIR, `${filename}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`[screenshot] Saved → ${filePath}`);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Payment Page', () => {

  // ── Test 1: Page loads with payment records ───────────────────────────────
  test('should load the Payments page and show records', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await navigateToPayments(page);

    // URL or page title should reference "payment"
    const url   = page.url();
    const title = await page.title();
    expect(
      url.toLowerCase().includes('payment') || title.toLowerCase().includes('payment'),
      `Expected to land on the Payments page but URL="${url}", title="${title}"`
    ).toBeTruthy();

    // A data table must be present and visible
    const table = page.locator('table, [role="grid"], [role="table"], .table');
    await expect(table.first()).toBeVisible({ timeout: 10000 });

    // At least one data row must exist  (skip header rows)
    const rows = page.locator('tbody tr, [role="row"]:not([role="columnheader"])');
    const rowCount = await rows.count();
    expect(
      rowCount,
      'Expected at least one payment record in the table but found none'
    ).toBeGreaterThan(0);
  });

  // ── Test 2: Edit first payment, update remarks, screenshot, verify ────────
  test('should edit the first payment, update remarks with timestamp, and take a screenshot', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // ── Step 1: Navigate to Payments ─────────────────────────────────────────
    await navigateToPayments(page);

    // Confirm the list has records
    const table = page.locator('table, [role="grid"], [role="table"], .table');
    await expect(table.first()).toBeVisible({ timeout: 10000 });

    const rows = page.locator('tbody tr, [role="row"]:not([role="columnheader"])');
    const rowCount = await rows.count();
    expect(
      rowCount,
      'No payment records found – cannot proceed with edit test'
    ).toBeGreaterThan(0);

    // ── Step 2: Open "Edit Payment" for the first row ─────────────────────────
    await clickEditPaymentForFirstRow(page);

    // ── Step 3: Verify the edit form loaded ───────────────────────────────────
    const formLocator = await waitForEditForm(page);
    await expect(formLocator).toBeVisible({ timeout: 10000 });

    // Remarks field must be present
    const remarksLocator = await getRemarksLocator(page);

    // ── Step 4: Append current date/time to Remarks ───────────────────────────
    const timestamp = currentTimestamp();

    const existingRemarks =
      (await remarksLocator.inputValue().catch(() => '')) ||
      (await remarksLocator.textContent().catch(() => '')) ||
      '';

    const updatedRemarks = existingRemarks + timestamp;
    await remarksLocator.fill(updatedRemarks);

    // ── Step 5: Submit the update ─────────────────────────────────────────────
    const submitSelectors = [
      'button:has-text("Update Payment")',
      'button:has-text("Save Payment")',
      'button:has-text("Update")',
      'button:has-text("Save")',
      'input[type="submit"]',
      'button[type="submit"]',
    ];

    let submitted = false;
    for (const sel of submitSelectors) {
      const loc = page.locator(sel).first();
      if (await loc.count() > 0) {
        await loc.click();
        submitted = true;
        break;
      }
    }
    expect(submitted, 'Could not find the submit / update button in the payment form').toBeTruthy();

    // Wait for the save operation to complete
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // ── Step 6: Screenshot after successful update ────────────────────────────
    await saveScreenshot(page, `payment-updated_${filenameTimestamp()}`);

    // ── Step 7: Return to the payments list ───────────────────────────────────
    // Try Cancel / Close buttons first; fall back to direct navigation
    const closeSelectors = [
      'button:has-text("Cancel")',
      'button:has-text("Close")',
      'button[aria-label="Close"]',
      'button[aria-label="close"]',
      '.btn-close',
      '[data-bs-dismiss="modal"]',
      '[data-dismiss="modal"]',
      'a:has-text("Cancel")',
      'a:has-text("Back")',
    ];

    let closed = false;
    for (const sel of closeSelectors) {
      const loc = page.locator(sel).first();
      if (await loc.count() > 0) {
        await loc.click();
        await page.waitForTimeout(800);
        closed = true;
        break;
      }
    }
    if (!closed) {
      await navigateToPayments(page);
    }

    // ── Step 8: Verify the list is visible again ──────────────────────────────
    await expect(table.first()).toBeVisible({ timeout: 10000 });

    // ── Step 9: Re-open the first row and confirm the remark was persisted ────
    await clickEditPaymentForFirstRow(page);
    await expect(formLocator).toBeVisible({ timeout: 10000 });

    const remarksAfter = await getRemarksLocator(page);
    await expect(remarksAfter).toBeVisible({ timeout: 8000 });

    const actualRemarks =
      (await remarksAfter.inputValue().catch(async () =>
        await remarksAfter.textContent().catch(() => '')
      )) || '';

    expect(
      actualRemarks,
      `Remarks should contain the appended timestamp "${timestamp}"`
    ).toContain(timestamp);
  });

});
