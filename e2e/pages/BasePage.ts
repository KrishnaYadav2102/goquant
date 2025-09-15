import { Page, expect, Locator } from '@playwright/test';

/**
 * BasePage class provides common reusable methods for all page objects.
 * Handles navigation, element interactions, assertions, and loader waits.
 */
export class BasePage {
  // The Playwright Page object is shared across all methods
  constructor(protected page: Page) {}

  /**
   * Navigate to a given URL and wait for the loader to disappear.
   * @param url The URL to navigate to
   */
  async goto(url: string) {
    console.log(`Navigating to ${url}`);
    await this.page.goto(url);

    // Wait for any page loader/spinner to disappear
    await this.waitForLoader();
  }

  /**
   * Click on a given locator.
   * @param locator The Playwright Locator to click
   */
  async click(locator: Locator) {
    console.log(`Clicking on ${locator}`);
    await this.waitForLocator(locator);
    await locator.click();
  }

  /**
   * Fill text into a given input locator.
   * @param locator The Playwright Locator of the input field
   * @param text The text to enter
   */
  async fill(locator: Locator, text: string) {
    console.log(`Enter ${text} into ${locator}`);
    await this.waitForLocator(locator);
    await locator.fill(text);
  }

  /**
   * Assert that a given element is visible on the page.
   * @param locator The Playwright Locator to check visibility
   */
  async assertVisible(locator: Locator) {
    console.log(`Checking for visibility of ${locator}`);
    await this.waitForLocator(locator);
    await expect(locator).toBeVisible();
  }

  /**
   * Wrapper method to assert that a locator contains specific text
   * @param locator Playwright Locator to check
   * @param expectedText The text that should be contained
   */
  async assertTextContains(locator: Locator, expectedText: string) {
    console.log(`Checking if element contains text: "${expectedText}"`);
    await this.waitForLocator(locator);
    await expect(locator).toContainText(expectedText);
  }

  /**
   * Asserts that a form input has the expected value
   * @param locator The input field Locator
   * @param expectedValue The value expected in the input
   */
  async assertInputValue(locator: Locator, expectedValue: string) {
    console.log(`Checking that input contains value: "${expectedValue}"`);
    await this.waitForLocator(locator);
    await expect(locator).toHaveValue(expectedValue);
  }

  /**
   * Waits for a loader/spinner to appear and then disappear.
   * If no loader appears within `appearTimeout`, it silently continues.
   * @param loaderSelector CSS/XPath selector for loader element
   * @param appearTimeout Max time to wait for loader to appear (default: 2s)
   * @param disappearTimeout Max time to wait for loader to disappear (default: 10s)
   */
  async waitForLoader(
    loaderSelector: string = 'img[src="/img/spin.gif"]', // Default loader image selector
    appearTimeout = 2000, // Max wait for loader to appear
    disappearTimeout = 10000 // Max wait for loader to disappear
  ) {
    const loader = this.page.locator(loaderSelector);

    try {
      // Step 1: Wait for loader to appear (if it shows up within timeout)
      await loader.waitFor({ state: 'visible', timeout: appearTimeout });
    } catch {
      // Loader never appeared → safe to continue execution
      return;
    }

    // Step 2: Wait for loader to disappear before interacting with the page
    await loader.waitFor({ state: 'hidden', timeout: disappearTimeout });
  }

  /**
   * Waits for the specified locator to reach a desired state.
   *
   * @param locator - The Playwright Locator to wait for
   * @param state - The state to wait for: 'visible' or 'hidden' (default: 'visible')
   * @param timeout - Maximum time to wait in milliseconds (default: 5000ms)
   *
   * Usage:
   *   await waitForLocator(page.locator('#submitBtn'));           // Waits for visibility
   *   await waitForLocator(page.locator('#loader'), 'hidden');   // Waits for loader to disappear
   */
  async waitForLocator(locator: Locator, state: 'visible' | 'hidden' = 'visible', timeout = 5000) {
    console.log(`Wait for ${locator} to be visible or hidden`);
    await locator.waitFor({ state, timeout });
  }
}
