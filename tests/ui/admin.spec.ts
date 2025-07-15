import { test, expect } from '@playwright/test';
import { AdminPage } from '../../pages/admin.page';
import { LoginPage } from '../../pages/login.page';

const validUsername = 'Admin';
const validPassword = 'admin123';

test.describe('Admin Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, validPassword);
    const adminPage = new AdminPage(page);
    await adminPage.goto();
  });

  test('Admin menu is visible @smoke', async ({ page }) => {
    const adminPage = new AdminPage(page);
    await expect(adminPage.adminMenu).toBeVisible({ timeout: 8000 });
  });

  test('User Management tab is visible @smoke', async ({ page }) => {
    const adminPage = new AdminPage(page);
    await expect(adminPage.userManagementTab).toBeVisible({ timeout: 8000 });
  });

  test('Can search for a user', async ({ page }) => {
    const adminPage = new AdminPage(page);
    await adminPage.searchUser('Admin');
    await expect(adminPage.searchInput).toHaveValue('Admin');
  });

  test('Can click Add User button', async ({ page }) => {
    const adminPage = new AdminPage(page);
    await expect(adminPage.addButton).toBeVisible();
    // Optionally click
    // await adminPage.clickAddUser();
  });
});
