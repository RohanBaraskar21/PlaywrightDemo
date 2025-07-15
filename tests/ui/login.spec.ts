import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

const validUsername = 'Admin';
const validPassword = 'admin123';

test.describe('Login Page', () => {
  test('Successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, validPassword);
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h6')).toHaveText('Dashboard');
  });

  test('Login attempt with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('InvalidUser', validPassword);
    await expect(loginPage.invalidCredentialsMessage()).toHaveText('Invalid credentials');
  });

  test('Login attempt with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, 'wrongpass');
    await expect(loginPage.invalidCredentialsMessage()).toHaveText('Invalid credentials');
  });

  test('Login attempt with both fields empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(loginPage.usernameRequiredMessage()).toHaveText('Required');
    await expect(loginPage.passwordRequiredMessage()).toHaveText('Required');
  });

  test('Login attempt with only username filled', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, '');
    await expect(loginPage.passwordRequiredMessage()).toBeVisible();
  });

  test('Login attempt with only password filled', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', validPassword);
    await expect(loginPage.usernameRequiredMessage()).toBeVisible();
  });

  test('Check for error message on failed login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong', 'wrong');
    await expect(loginPage.invalidCredentialsMessage()).toHaveText('Invalid credentials');
  });
});
