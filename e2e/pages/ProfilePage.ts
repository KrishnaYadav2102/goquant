import { Page } from '@playwright/test';
import { ROUTES } from '../utils/constants';
import { BasePage } from './BasePage';
import {
  generateAddress,
  generateAge,
  generateGender,
  generateName,
  generatePassword,
  generatePhoneNumber,
} from '../utils/helper';

/**
 * ProfilePage class represents the user profile page.
 * Inherits common methods from BasePage and contains locators and actions
 * to interact with profile form, including basic info, additional info, and language/hobby selections.
 */
export class ProfilePage extends BasePage {
  // -------------------------
  // Basic Info
  // -------------------------
  firstnameInput = this.page.getByLabel('First Name'); // Input for first name
  lastnameInput = this.page.getByLabel('Last Name'); // Input for last name

  // -------------------------
  // Additional Info 1
  // -------------------------
  genderInput = this.page.getByLabel('Gender'); // Input for gender
  ageInput = this.page.getByLabel('Age', { exact: true }); // Input for age
  addressInput = this.page.getByLabel('Address'); // Input for address
  phoneInput = this.page.getByLabel('Phone'); // Input for phone
  hobbyDropdown = this.page.locator('#hobby'); // Dropdown for hobbies

  // -------------------------
  // Additional Info 2
  // -------------------------
  currentPasswordInput = this.page.getByLabel('Current Password', { exact: true }); // Current password
  newPasswordInput = this.page.getByLabel('New Pasword', { exact: true }); // New password
  confirmPasswordInput = this.page.getByLabel('Confirm Password', { exact: true }); // Confirm password
  languageDropdown = this.page.locator('#language'); // Language selection dropdown

  // Action buttons
  saveButton = this.page.getByRole('button', { name: 'Save' }); // Save button
  cancelButton = this.page.getByRole('link', { name: 'Cancel' }); // Cancel button

  // Success message after profile is saved
  messageProfileSaved = this.page
    .getByText('The profile has been saved successful', { exact: true })
    .first();
  messageFirstnameTooLong = this.page.getByText('first name is too long', { exact: true }).first();
  messageLastnameTooLong = this.page.getByText('last name is too long', { exact: true }).first();
  messageOutsideAgeRange = this.page.getByText('Age must be in the range from 0 to 95', {
    exact: true,
  });
  messageAddressTooLong = this.page.getByText('address is too long', { exact: true }).first();

  messageUnknownError = this.page.getByText('Unknown error', { exact: true }).first();
  messageGetACandy = this.page.getByText('Get a candy ;)', { exact: true }).first();
  messagePasswordNotMatching = this.page.getByText('Passwords do not match', { exact: true });
  messageCurrentPasswordLength = this.page
    .getByText('minimum field size of 6, ChangePasswordInput.PreviousPassword.', { exact: true })
    .first();
  messageIncorrectCurrentPassword = this.page
    .getByText('NotAuthorizedException: Access Token has expired', { exact: true })
    .first();
  messageNewPasswordLowercase = this.page
    .getByText('Password did not conform with policy: Password must have lowercase characters', {
      exact: true,
    })
    .first();
  messageNewPasswordUppercase = this.page
    .getByText('Password did not conform with policy: Password must have uppercase characters', {
      exact: true,
    })
    .first();
  messageNewPasswordSymbol = this.page
    .getByText('Password did not conform with policy: Password must have symbol characters', {
      exact: true,
    })
    .first();
  messageNewPasswordNumeric = this.page
    .getByText('Password did not conform with policy: Password must have numeric characters', {
      exact: true,
    })
    .first();

  constructor(page: Page) {
    super(page); // Call BasePage constructor
  }

  /**
   * Navigate to the profile page and wait for any loader/spinner to disappear
   */
  async open() {
    await this.goto(ROUTES.PROFILE);
    await this.waitForLoader();
  }

  /**
   * Generate a random hobby from the available list
   * @returns Random hobby string
   */
  generateHobby(): string {
    const hobbies = [
      'Hiking',
      'Reading',
      'Working',
      'Learning',
      'Video Games',
      'Biking',
      'Movies',
      'Reading Comics',
      'Drawing',
      'Jogging',
      // 'Knitting', // Commented out intentionally
      'Bird-watching',
      'Other',
    ];
    return hobbies[Math.floor(Math.random() * hobbies.length)];
  }

  /**
   * Select a value from the hobby dropdown
   * @param option Hobby to select
   */
  async selectHobbyDropdown(option: string) {
    await this.page.selectOption('#hobby', { label: option });
  }

  /**
   * Select a value from the language dropdown
   * @param option Language to select
   */
  async selectLanguageDropdown(option: string) {
    await this.page.selectOption('#language', { label: option });
  }

  /**
   * Update profile form with provided values or random/default values
   * Fills inputs, selects dropdowns, clicks save, and validates updates
   */
  async updateProfile(
    firstname: string = generateName(),
    lastname: string = generateName(),
    gender: string = generateGender(),
    age: string = String(generateAge(0, 95)),
    address: string = generateAddress(),
    phone: string = generatePhoneNumber(),
    hobby: string = this.generateHobby(),
    language: string = 'English',
    shouldSave: boolean = true
  ) {
    // Log all update parameters for debugging
    console.log('Update Profile Parameters:', {
      firstname,
      lastname,
      gender,
      age,
      address,
      phone,
      hobby,
      language,
    });

    // Fill basic and additional info fields
    await this.fill(this.firstnameInput, firstname);
    await this.fill(this.lastnameInput, lastname);
    await this.fill(this.genderInput, gender);
    await this.fill(this.ageInput, age);
    await this.fill(this.addressInput, address);
    await this.fill(this.phoneInput, phone);
    await this.selectHobbyDropdown(hobby);
    await this.selectLanguageDropdown(language); // Select language

    if (shouldSave) {
      await this.click(this.saveButton); // Click save button
    }
  }

  async updatePassword(
    currentPassword: string = generatePassword(),
    newPassword: string = generatePassword(),
    confirmPassword: string = '',
    shouldSave: boolean = true
  ) {
    confirmPassword = confirmPassword ? newPassword : ''; // Ensure confirmPassword is not empty

    await this.fill(this.currentPasswordInput, currentPassword);
    await this.fill(this.newPasswordInput, newPassword);
    await this.fill(this.confirmPasswordInput, confirmPassword);

    if (shouldSave) {
      await this.click(this.saveButton); // Click save button
    }
  }
}
