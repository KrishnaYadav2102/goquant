import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { USERS } from '../utils/constants';
import { LoginPage } from '../pages/LoginPage';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

/**
 * Setup test to authenticate a user and save authentication state.
 * This allows reusing the login state across multiple tests without logging in every time.
 */
setup('authenticate', async ({ page }) => {
  // Initialize the LoginPage object
  const loginPage = new LoginPage(page);

  // Navigate to login page
  await loginPage.goto('/');

  // Use LoginPage's login() method
  await loginPage.login(USERS.krishna.username, USERS.krishna.password);

  // Save authenticated browser state to a JSON file
  // This can be loaded in other tests to bypass login
  await page.context().storageState({ path: authFile });
});
