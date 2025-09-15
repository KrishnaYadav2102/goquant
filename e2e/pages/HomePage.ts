import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/constants';

/**
 * HomePage class represents the landing/home page after login.
 * Inherits common methods from BasePage.
 * Contains locators and validation methods specific to the Home page.
 */
export class HomePage extends BasePage {
  // Locator for greeting text, e.g., "Hi, User"
  greeting = this.page.getByText(/Hi,/);

  // Locator for "Profile" link in the header/navigation
  profileLink = this.page.getByRole('link', { name: 'Profile' });

  // Locator for "Logout" link in the header/navigation
  logoutLink = this.page.getByRole('link', { name: 'Logout' });

  /**
   * Constructor initializes the HomePage object
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    super(page); // Call BasePage constructor
  }

  /**
   * Validates that the greeting element is visible on the page
   */
  async validateGreeting() {
    await this.assertVisible(this.greeting);
  }

  /**
   * Validates that the "Profile" link is visible and points to the correct route
   */
  async validateProfileLink() {
    await this.assertVisible(this.profileLink);
    await expect(this.profileLink).toHaveAttribute('href', ROUTES.PROFILE);
  }

  /**
   * Validates that the "Logout" link is visible and has the expected href
   */
  async validateLogoutLink() {
    await this.assertVisible(this.logoutLink);
    await expect(this.logoutLink).toHaveAttribute('href', 'javascript:void(0)');
  }
}
