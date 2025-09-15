import { test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import registrationData from '../test-data/registration.json' assert { type: 'json' };

/**
 * Test suite: Successful registration
 */
test.describe('Registration Test: Successful', () => {
  /**
   * Test Case: Register a user with valid inputs
   */
  test('TC01: User registration with valid inputs', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // Open the registration page
    await registerPage.open();

    // Fill the registration form with default/random values and submit
    await registerPage.register();

    // Validate the success message after registration
    await registerPage.validateMessage('Registration is successful');
  });
});

/**
 * Test suite: Registration form validation tests (negative scenarios)
 */
test.describe('Registration Test: Form validations', () => {
  // Loop through each test case from JSON data
  for (const data of registrationData) {
    test(`Register Test: ${data.name}`, async ({ page }) => {
      const registerPage = new RegisterPage(page);

      // Open the registration page
      await registerPage.open();

      // Fill the registration form using test data from JSON and submit
      await registerPage.register(
        data.username,
        data.firstname,
        data.lastname,
        data.password,
        data.confirmPassword
      );

      // Validate the expected error message from test data
      await registerPage.validateMessage(data.message);
    });
  }
});
