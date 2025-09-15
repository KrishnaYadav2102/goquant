import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { BASE_URL } from '../utils/constants';
import { USERS } from '../utils/constants';

/**
 * Test suite for login functionality
 */
test.describe('Login Tests', () => {
  /**
   * Test: Login with valid credentials for an existing user
   */
  test('User login for existing user with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Navigate to login page
    await loginPage.goto(BASE_URL);

    // Perform login with valid username and password
    await loginPage.login(USERS.krishna.username, USERS.krishna.password);

    // Validate that home page elements are visible after login
    await homePage.validateGreeting(); // Check greeting text
    await homePage.validateProfileLink(); // Check Profile link
    await homePage.validateLogoutLink(); // Check Logout link
  });

  /**
   * Test: Login with incorrect password for existing user
   */
  test('User login for existing user with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto(BASE_URL);

    // Attempt login with valid username but wrong password
    await loginPage.login(USERS.krishna.username, 'wrong_password');

    // Assert that error message is visible
    // Using LoginPage wrapper method assertVisible
    await loginPage.assertVisible(page.getByText('Invalid username/password'));
  });

  /**
   * Test: Login with non-existing user
   */
  test('User login for non-existing user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto(BASE_URL);

    // Attempt login with a username that doesn't exist
    await loginPage.login('non-existing-user', 'wrong_password');

    // Assert that error message is visible
    await loginPage.assertVisible(page.getByText('Invalid username/password'));
  });

  /**
   * Test: Logout functionality for a logged-in user
   */
  test('User logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // Login first
    await loginPage.goto(BASE_URL);
    await loginPage.login(USERS.krishna.username, USERS.krishna.password);

    // Validate home page after login
    await homePage.validateGreeting();
    await homePage.validateProfileLink();
    await homePage.validateLogoutLink();

    // Click logout link
    await homePage.click(homePage.logoutLink);

    // Validate that login page is displayed after logout
    await loginPage.validateUserLoggedOut();
  });
});
