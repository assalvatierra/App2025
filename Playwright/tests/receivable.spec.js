/**
 * receivable.spec.js
 *
 * Tests for the Receivable page:
 *  1. Navigate to Receivables after login and verify the page loads completely.
 *  2. Open the first row's "Edit Receivable" action and verify the form loads.
 *  3. Append the current date/time to the Remarks field and submit.
 *  4. Close / cancel the form to return to the list.
 *  5. Re-open the first row and confirm the updated remark is persisted.
 */

const { test, expect } = require('./fixtures');

const RECEIVABLES_URL = 'https://localhost:51099/receivables';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns an ISO-like timestamp string suitable for appending to a text field,
 * e.g. " [updated: 2026-04-07 14:32:07]"
 */
function currentTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return ` [updated: ${date} ${time}]`;
}

/**
 * Navigates to the Receivables section by looking for a nav / sidebar link.
 * Tries several common label patterns; falls back to a direct URL.
 */
async function navigateToReceivables(page) {
  const receivableLinkSelectors = [
    'a:has-text("Receivables")',
    'a:has-text("Receivable")',
    'nav >> text=Receivables',
    'aside >> text=Receivables',
    '[href*="receivable"]',
    '[href*="Receivable"]',
  ];

  for (const sel of receivableLinkSelectors) {
    const loc = page.locator(sel).first();
    if (await loc.count() > 0) {
      await loc.click();
      return;
    }
  }

  // Fallback: direct URL navigation
  await page.goto(RECEIVABLES_URL);
}

/**
 * Clicks the "Actions" button on the first table row to open its context menu,
 * then clicks the "Edit Receivable" item from that menu.
 */
async function clickEditReceivableForFirstRow(page) {
  // Step 1: Locate the Actions button in the first data row and click it.
  const actionsButton = page.locator('tbody tr:first-child button:has-text("Actions")');
  await expect(actionsButton).toBeVisible({ timeout: 10000 });
  await actionsButton.click();

  // Step 2: Wait for the context menu, then click "Edit Receivable".
  const editReceivableItem = page.locator(
    '[role="menu"] >> text=Edit Receivable, ' +
    '[role="menuitem"]:has-text("Edit Receivable"), ' +
    'ul >> li:has-text("Edit Receivable"), ' +
    '.dropdown-menu >> text=Edit Receivable, ' +
    '.context-menu >> text=Edit Receivable'
  ).first();

  // Fallback: any visible element with text "Edit Receivable" that appeared
  // after the Actions button was clicked.
  const editReceivableAny = page.locator('text=Edit Receivable').first();

  const isMenuItemVisible = await editReceivableItem.isVisible({ timeout: 3000 }).catch(() => false);
  if (isMenuItemVisible) {
    await editReceivableItem.click();
  } else {
    await expect(editReceivableAny).toBeVisible({ timeout: 5000 });
    await editReceivableAny.click();
  }
}

/**
 * Closes or cancels the receivable edit form and returns to the list.
 * Tries a Cancel button, a Close (×) button, and the browser Back as last resort.
 */
async function closeReceivableForm(page) {
  const closeSelectors = [
    'button:has-text("Cancel")',
    'button:has-text("Close")',
    'button[aria-label="Close"]',
    'button[aria-label="close"]',
    '.btn-close',
    '[data-dismiss="modal"]',
    '[data-bs-dismiss="modal"]',
    'a:has-text("Cancel")',
    'a:has-text("Back")',
  ];

  for (const sel of closeSelectors) {
    const loc = page.locator(sel).first();
    if (await loc.count() > 0) {
      await loc.click();
      await page.waitForTimeout(800);
      return;
    }
  }

  // Last resort: navigate back
  await page.goBack();
}

/**
 * Probes a list of selectors and returns the locator for the first Remarks
 * field that is currently visible on the page.  Waits up to `waitMs` ms per
 * candidate.  If nothing matches, logs all input/textarea names found in the
 * DOM to aid debugging, then throws so the test fails with a useful message.
 *
 * @param {import('@playwright/test').Page} page
 * @param {number} [waitMs=2000]
 * @returns {Promise<import('@playwright/test').Locator>}
 */
async function getRemarksLocator(page, waitMs = 2000) {
  const remarkSelectors = [
    // exact name attribute matches (case-insensitive variants)
    'textarea[name="remarks"]',
    'textarea[name="Remarks"]',
    'input[name="remarks"]',
    'input[name="Remarks"]',
    // id matches
    '#remarks',
    '#Remarks',
    // placeholder matches
    'textarea[placeholder*="Remark" i]',
    'input[placeholder*="Remark" i]',
    // label-adjacent matches
    'label:has-text("Remarks") + textarea',
    'label:has-text("Remarks") ~ textarea',
    'label:has-text("Remark") + textarea',
    'label:has-text("Remark") ~ textarea',
    'label:has-text("Remarks") + input',
    'label:has-text("Remarks") ~ input',
    'label:has-text("Remark") + input',
    'label:has-text("Remark") ~ input',
    // form-control inside a group whose label contains "Remark"
    '.form-group:has(label:has-text("Remark")) textarea',
    '.form-group:has(label:has-text("Remark")) input',
    '[class*="form"]:has(label:has-text("Remark")) textarea',
    '[class*="form"]:has(label:has-text("Remark")) input',
  ];

  for (const sel of remarkSelectors) {
    try {
      const loc = page.locator(sel).first();
      const visible = await loc.isVisible({ timeout: waitMs }).catch(() => false);
      if (visible) return loc;
    } catch {
      // selector may be invalid for this browser – skip
    }
  }

  // ── Diagnostic fallback ──────────────────────────────────────────────────
  const inputs = page.locator('input, textarea');
  const count  = await inputs.count();
  const found  = [];
  for (let i = 0; i < count; i++) {
    const el   = inputs.nth(i);
    const name = await el.getAttribute('name').catch(() => '');
    const id   = await el.getAttribute('id').catch(() => '');
    const ph   = await el.getAttribute('placeholder').catch(() => '');
    const tag  = await el.evaluate((n) => n.tagName.toLowerCase()).catch(() => '?');
    found.push(`  ${tag} name="${name}" id="${id}" placeholder="${ph}"`);
  }
  console.error(
    `[getRemarksLocator] Could not find a visible Remarks field.\n` +
    `Inputs/textareas found in DOM:\n${found.join('\n') || '  (none)'}`
  );

  throw new Error(
    'Could not find a visible Remarks field in the receivable form. ' +
    'Check the console output above for available input names/ids/placeholders ' +
    'and add the matching selector to getRemarksLocator().'
  );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe('Receivable Page', () => {

  // ── Test 1: Page loads completely ────────────────────────────────────────
  test('should load the Receivables list page after login', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await navigateToReceivables(page);

    // Wait for the network to settle
    await page.waitForLoadState('networkidle');

    // The page title / heading should mention "Receivable"
    const heading = page.locator(
      'h1, h2, h3, [class*="page-title"], [class*="heading"]'
    );
    const headingCount = await heading.count();
    let headingFound = false;
    for (let i = 0; i < headingCount; i++) {
      const text = (await heading.nth(i).textContent()) || '';
      if (text.toLowerCase().includes('receivable')) {
        headingFound = true;
        break;
      }
    }

    // If no heading found, fall back to checking the document title or URL
    if (!headingFound) {
      const url   = page.url();
      const title = await page.title();
      expect(
        url.toLowerCase().includes('receivable') ||
        title.toLowerCase().includes('receivable'),
        `Expected page to be the Receivables page but URL was "${url}" and title was "${title}"`
      ).toBeTruthy();
    } else {
      expect(headingFound).toBeTruthy();
    }

    // A data table must be present
    const table = page.locator('table, [role="grid"], [role="table"], .table');
    await expect(table.first()).toBeVisible({ timeout: 10000 });

    // At least one data row must exist
    const rows = page.locator('tbody tr, [role="row"]:not([role="columnheader"])');
    await expect(rows.first()).toBeVisible({ timeout: 10000 });
  });

  // ── Test 2–5: Edit first receivable, update remarks, verify persistence ──
  test('should edit the first receivable, update remarks with timestamp, and verify the change', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // ── Step 1: Navigate to Receivables ─────────────────────────────────────
    await navigateToReceivables(page);
    await page.waitForLoadState('networkidle');

    // Confirm list is visible
    const table = page.locator('table, [role="grid"], [role="table"], .table');
    await expect(table.first()).toBeVisible({ timeout: 10000 });

    const rows = page.locator('tbody tr, [role="row"]:not([role="columnheader"])');
    await expect(rows.first()).toBeVisible({ timeout: 10000 });

    // ── Step 2: Open Edit Receivable for the first row ──────────────────────
    await clickEditReceivableForFirstRow(page);

    // Wait for the edit form / modal / drawer to appear
    const formSelectors = [
      'form',
      '[role="dialog"]',
      '.modal',
      '.modal-content',
      '.drawer',
      '.side-panel',
    ];
    let formLocator = null;
    for (const sel of formSelectors) {
      const loc     = page.locator(sel).first();
      const visible = await loc.isVisible().catch(() => false);
      if (visible) {
        formLocator = loc;
        break;
      }
    }
    // If not immediately visible, wait a moment and try again
    if (!formLocator) {
      await page.waitForTimeout(1500);
      for (const sel of formSelectors) {
        const loc     = page.locator(sel).first();
        const visible = await loc.isVisible().catch(() => false);
        if (visible) {
          formLocator = loc;
          break;
        }
      }
    }
    expect(formLocator, 'Edit Receivable form / modal did not appear').not.toBeNull();
    await expect(formLocator).toBeVisible({ timeout: 10000 });

    // Verify the form contains a "Remarks" field
    const remarksLocator = await getRemarksLocator(page);

    // ── Step 3: Append current date/time to Remarks ─────────────────────────
    const timestamp = currentTimestamp();

    const existingRemarks =
      (await remarksLocator.inputValue().catch(() => '')) ||
      (await remarksLocator.textContent().catch(() => '')) ||
      '';

    await remarksLocator.fill(existingRemarks + timestamp);

    const expectedRemarks = existingRemarks + timestamp;

    // ── Step 4: Click "Update Receivable" button ────────────────────────────
    const submitSelectors = [
      'button:has-text("Update Receivable")',
      'button:has-text("Update")',
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
    expect(submitted, 'Could not find the "Update Receivable" submit button').toBeTruthy();

    // Wait for the save to complete (toast, network idle, or modal closes)
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // ── Step 5: Close / cancel the form to return to the list ──────────────
    await closeReceivableForm(page);

    // Ensure we are back on the list (table visible)
    await expect(table.first()).toBeVisible({ timeout: 10000 });

    // ── Step 6: Re-open the first row and verify the updated remarks ────────
    await clickEditReceivableForFirstRow(page);

    // Wait for the form to open again
    if (formLocator) {
      await expect(formLocator).toBeVisible({ timeout: 10000 });
    } else {
      await page.waitForTimeout(1500);
    }

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
