import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/constants';
import { generateName, generatePassword } from '../utils/helper';

/**
 * RegisterPage class represents the user registration page.
 * Inherits common methods from BasePage and contains locators and actions
 * to interact with registration form fields and buttons.
 */
export class RegisterPage extends BasePage {
  // -------------------------
  // Form Inputs
  // -------------------------
  usernameInput = this.page.getByLabel('Login'); // Input for username/login
  firstnameInput = this.page.getByLabel('First Name'); // Input for first name
  lastnameInput = this.page.getByLabel('Last Name'); // Input for last name
  passwordInput = this.page.getByLabel('Password', { exact: true }); // Input for password
  confirmPasswordInput = this.page.getByLabel('Confirm Password', { exact: true }); // Confirm password input

  // -------------------------
  // Action Buttons
  // -------------------------
  registerButton = this.page.getByRole('button', { name: 'Register' }); // Register button
  // cancelButton = this.page.getByRole('button', { name: 'Cancel' });  // Cancel button (commented out)

  /**
   * Constructor initializes the RegisterPage object
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    super(page); // Call BasePage constructor
  }

  /**
   * Open the registration page and wait for any loader/spinner to disappear
   */
  async open() {
    await this.goto(ROUTES.REGISTER);
    await this.waitForLoader();
  }

  /**
   * Fill the registration form and submit
   * @param username Username/login (default: random generated)
   * @param firstname First name (default: random generated)
   * @param lastname Last name (default: random generated)
   * @param password Password (default: random 10-character string)
   * @param confirmPassword Confirm password (if not provided, same as password)
   */
  async register(
    username: string = generateName(),
    firstname: string = generateName(),
    lastname: string = generateName(),
    password: string = generatePassword(10),
    confirmPassword?: string
  ): Promise<void> {
    confirmPassword = confirmPassword || password; // Use password as confirmPassword if not provided

    // Fill all form fields
    await this.fill(this.usernameInput, username);
    await this.fill(this.firstnameInput, firstname);
    await this.fill(this.lastnameInput, lastname);
    await this.fill(this.passwordInput, password);
    await this.fill(this.confirmPasswordInput, confirmPassword);

    // Click the register button to submit the form
    await this.click(this.registerButton);
  }

  /**
   * Validate that a message (success or error) is visible and contains expected text
   * @param message The message text to validate
   */
  async validateMessage(message: string): Promise<void> {
    const userExistsError = this.page.getByText(message); // Locate the message element by text

    // Assert that the message is visible
    await this.assertVisible(userExistsError);

    // Assert that the message contains the expected text
    await this.assertTextContains(userExistsError, message);
  }
}
