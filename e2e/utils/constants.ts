/**
 * BASE_URL: The main URL of the application under test
 */
export const BASE_URL = 'https://buggy.justtestit.org/';

/**
 * ROUTES: Key paths within the application
 * Used with page.goto() or navigation helpers
 */
export const ROUTES = {
  HOME: '/', // Home page
  REGISTER: '/register', // Registration page
  PROFILE: '/profile', // User profile page
};

/**
 * USERS: Test users with credentials
 * Can be extended to add more users
 */
export const USERS = {
  krishna: {
    username: 'ky', // Test username
    // Password: Uses environment variable if set, otherwise default
    password: process.env.TEST_USER_PASS || '123456789Go@',
  },

  krishna2: {
    username: 'ky2', // Test username
    // Password: Uses environment variable if set, otherwise default
    password: process.env.TEST_USER_PASS || '123456789Go@',
  },
};
