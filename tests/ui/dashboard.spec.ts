import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard.page';
import { LoginPage } from '../../pages/login.page';

const validUsername = 'Admin';
const validPassword = 'admin123';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUsername, validPassword);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('@smoke Dashboard loads and displays title', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await expect(dashboard.title).toHaveText('Dashboard');
  });

  test('@smoke Main dashboard widgets are present', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await expect(dashboard.timeAtWorkWidget).toBeVisible();
    await expect(dashboard.myActionsWidget).toBeVisible();
    await expect(dashboard.quickLaunchWidget).toBeVisible();
  });

  test('User profile info is displayed @smoke', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await expect(dashboard.userProfileName).toBeVisible();
  });

  test('Time at Work widget displays info', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await expect(dashboard.timeAtWorkWidget).toBeVisible();
  });

  test('Quick Launch buttons are present and clickable @regression', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await expect(dashboard.quickLaunchButtons.first()).toBeVisible();
    // Optionally click the first button
    // await dashboard.quickLaunchButtons.first().click();
  });

  test('My Actions section is visible', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await expect(dashboard.myActionsWidget).toBeVisible();
  });

  test('Logout from dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logout();
    const loginPage = new LoginPage(page);
    await expect(page).toHaveURL(loginPage.url);
  });
});
