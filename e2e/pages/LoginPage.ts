import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage class represents the login page of the application.
 * Inherits common methods from BasePage for reusable interactions.
 * Contains locators and actions specific to login functionality.
 */
export class LoginPage extends BasePage {
  // Locator for username/email input field
  usernameInput = this.page.locator('input[name="login"]');

  // Locator for password input field
  passwordInput = this.page.locator('input[name="password"]');

  // Locator for login button
  loginButton = this.page.getByRole('button', { name: 'Login' });

  // Locator for register link/button
  registerButton = this.page.getByRole('link', { name: 'Register' });

  /**
   * Constructor initializes the LoginPage object
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    super(page); // Call BasePage constructor
  }

  /**
   * Performs login action with given username and password
   * @param username User's username or email
   * @param password User's password
   */
  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username); // Fill username
    await this.fill(this.passwordInput, password); // Fill password
    await this.click(this.loginButton); // Click login button
  }

  /**
   * Validates that the user is logged out by checking visibility of login form elements
   */
  async validateUserLoggedOut() {
    await this.assertVisible(this.usernameInput); // Username input should be visible
    await this.assertVisible(this.passwordInput); // Password input should be visible
    await this.assertVisible(this.loginButton); // Login button should be visible
    await this.assertVisible(this.registerButton); // Register button should be visible
  }
}
