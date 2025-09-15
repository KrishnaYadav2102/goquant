import { test } from '@playwright/test';
import { ProfilePage } from '../pages/ProfilePage';
import { LoginPage } from '../pages/LoginPage';
import { BASE_URL } from '../utils/constants';
import { USERS } from '../utils/constants';
import { HomePage } from '../pages/HomePage';

test.describe('Profile Update Test', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let profilePage: ProfilePage;

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    profilePage = new ProfilePage(page);

    // Perform login
    await loginPage.goto(BASE_URL);
    await loginPage.login(USERS.krishna.username, USERS.krishna.password);

    // Navigate to Profile page
    await homePage.click(homePage.profileLink);
  });

  test('Update with valid inputs', async ({ page }) => {
    // Update profile with default/random values (including first name)
    await profilePage.updateProfile();

    // Assert that success message is visible
    await profilePage.assertVisible(profilePage.messageProfileSaved);
  });

  test('Update profile with invalid firstname - too long', async () => {
    await profilePage.updateProfile(
      'Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna '
    );
    await profilePage.assertVisible(profilePage.messageFirstnameTooLong);
  });

  test('Update profile with invalid lastname - too long', async () => {
    await profilePage.updateProfile(
      'CustomFirst',
      'Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna Krishna '
    );
    await profilePage.assertVisible(profilePage.messageLastnameTooLong);
  });

  test('Update profile with invalid Gender', async () => {
    await profilePage.updateProfile('F', 'L', 'Prefer Not to say');
    await profilePage.assertVisible(profilePage.messageUnknownError);
  });

  test('Update profile with invalid Age - float', async () => {
    await profilePage.updateProfile('F', 'L', 'Male', '2.0');
    await profilePage.assertVisible(profilePage.messageGetACandy);
  });

  test('Update profile with invalid Age - Non-Numeric', async () => {
    await profilePage.updateProfile('F', 'L', 'Male', 'age');
    await profilePage.assertVisible(profilePage.messageUnknownError);
  });

  test('Update profile with invalid Age - Numeric Leading & trailing spaces', async () => {
    await profilePage.updateProfile('F', 'L', 'Male', '  2  ');
    await profilePage.assertVisible(profilePage.messageGetACandy);
  });

  test('Update profile with invalid Age - negative', async () => {
    await profilePage.updateProfile(
      'F',
      'L',
      'Male',
      '-1',
      '',
      '',
      'Reading',
      'English',
      false,
    );
    await profilePage.assertVisible(profilePage.messageOutsideAgeRange);
  });

  test('Update profile with invalid Age - Upper limit: 96', async () => {
    await profilePage.updateProfile(
      'F',
      'L',
      'Male',
      '96',
      '',
      '',
      'Reading',
      'English',
      false,
    );
    await profilePage.assertVisible(profilePage.messageOutsideAgeRange);
  });

  test('Update profile with invalid Address - Too long', async () => {
    await profilePage.updateProfile(
      'F',
      'L',
      'Male',
      '30',
      'A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment A205 Tower 100, Tesco Beetle Apartment '
    );
    await profilePage.assertVisible(profilePage.messageAddressTooLong);
  });

  test('Update profile with invalid Phone - symbols', async () => {
    await profilePage.updateProfile(
      'F',
      'L',
      'Male',
      '30',
      'A205 Tower 100, Tesco Beetle Apartment A205 Tower 100',
      '+++(0)++++'
    );
    await profilePage.assertVisible(profilePage.messageProfileSaved);
  });

  test('Update profile with invalid Phone - 0', async () => {
    await profilePage.updateProfile(
      'F',
      'L',
      'Male',
      '30',
      'A205 Tower 100, Tesco Beetle Apartment A205 Tower 100',
      '0'
    );
    await profilePage.assertVisible(profilePage.messageProfileSaved);
  });

  test('Update profile with invalid Phone - 00000000000', async () => {
    await profilePage.updateProfile(
      'F',
      'L',
      'Male',
      '30',
      'A205 Tower 100, Tesco Beetle Apartment A205 Tower 100',
      '00000000000'
    );
    await profilePage.assertVisible(profilePage.messageProfileSaved);
  });

  test('Update profile with invalid Phone - Only country code: +91', async () => {
    await profilePage.updateProfile(
      'F',
      'L',
      'Male',
      '30',
      'A205 Tower 100, Tesco Beetle Apartment A205 Tower 100',
      '+91'
    );
    await profilePage.assertVisible(profilePage.messageProfileSaved);
  });

  test('Update profile with invalid Hobby - Knitting', async () => {
    await profilePage.updateProfile(
      'F',
      'L',
      'Male',
      '30',
      'A205 Tower 100, Tesco Beetle Apartment A205 Tower 100',
      '+9199009900',
      'Knitting'
    );
    await profilePage.assertVisible(profilePage.messageUnknownError);
  });
});

test.describe.skip('Change Password Test', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let profilePage: ProfilePage;

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    profilePage = new ProfilePage(page);

    // Perform login
    await loginPage.goto(BASE_URL);
    await loginPage.login(USERS.krishna2.username, USERS.krishna2.password);

    // Navigate to Profile page
    await homePage.click(homePage.profileLink);
  });

  test('Update with valid inputs', async ({ page }) => {
    // Update profile with default/random values (including first name)
    await profilePage.updatePassword('123456789Go@', '123456789Go@', '123456789Go@');

    // Assert that success message is visible
    await profilePage.assertVisible(profilePage.messageProfileSaved);
  });

  test('Update with invalid password: New Password not matching', async ({ page }) => {
    await profilePage.updatePassword('abc', 'same', 'not-same', false);
    await profilePage.assertVisible(profilePage.messagePasswordNotMatching);
  });

  test('Update with invalid password: Confirm Password empty string', async ({ page }) => {
    await profilePage.updatePassword('abc', 'same', '', false);
    await profilePage.assertVisible(profilePage.messagePasswordNotMatching);
  });

  test('Update with invalid password: New Password empty string', async ({ page }) => {
    await profilePage.updatePassword('abc', '', 'same', false);
    await profilePage.assertVisible(profilePage.messagePasswordNotMatching);
  });

  test('Update with invalid password: Blank Current password', async ({ page }) => {
    await profilePage.updatePassword('', '12345678Go@', '12345678Go@');
    await profilePage.assertVisible(profilePage.messageCurrentPasswordLength);
  });

  test('Update with invalid password: Short Current password', async ({ page }) => {
    await profilePage.updatePassword('abc', '12345678Go@', '12345678Go@');
    await profilePage.assertVisible(profilePage.messageCurrentPasswordLength);
  });

  test('Update with invalid password: Incorrect Current password', async ({ page }) => {
    await profilePage.updatePassword('12345678', '12345678Go@', '12345678Go@');
    await profilePage.assertVisible(profilePage.messageIncorrectCurrentPassword);
  });

  test('Update with invalid password: Only numeric New password', async ({ page }) => {
    await profilePage.updatePassword('123456789Go@', '123456789', '123456789');
    await profilePage.assertVisible(profilePage.messageNewPasswordLowercase);
  });

  test('Update with invalid password: Without lowercase New password', async ({ page }) => {
    await profilePage.updatePassword('123456789Go@', '123456789a', '123456789a');
    await profilePage.assertVisible(profilePage.messageNewPasswordUppercase);
  });

  test('Update with invalid password: Without uppercase New password', async ({ page }) => {
    await profilePage.updatePassword('123456789Go@', '123456789aB', '123456789aB');
    await profilePage.assertVisible(profilePage.messageNewPasswordSymbol);
  });

  test('Update with invalid password: Without symbol New password', async ({ page }) => {
    await profilePage.updatePassword('123456789Go@', '123456789aB', '123456789aB');
    await profilePage.assertVisible(profilePage.messageNewPasswordSymbol);
  });

  test('Update with invalid password: Without number New password', async ({ page }) => {
    await profilePage.updatePassword('123456789Go@', 'Abcdefgh@', 'Abcdefgh@');
    await profilePage.assertVisible(profilePage.messageNewPasswordNumeric);
  });
});
