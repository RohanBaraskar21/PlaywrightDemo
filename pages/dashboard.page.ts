import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly title: Locator;
  readonly timeAtWorkWidget: Locator;
  readonly myActionsWidget: Locator;
  readonly quickLaunchWidget: Locator;
  readonly quickLaunchButtons: Locator;
  readonly userProfileName: Locator;
  readonly userDropdownIcon: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h6');
    this.timeAtWorkWidget = page.locator('.oxd-grid-item.orangehrm-dashboard-widget:has-text("Time at Work")');
    this.myActionsWidget = page.locator('.oxd-grid-item.orangehrm-dashboard-widget:has-text("My Actions")');
    this.quickLaunchWidget = page.locator('.oxd-grid-item.orangehrm-dashboard-widget:has-text("Quick Launch")');
    this.quickLaunchButtons = page.locator('div:has-text("Quick Launch") button');
    this.userProfileName = page.locator('.oxd-userdropdown-name');
    this.userDropdownIcon = page.locator('.oxd-userdropdown-icon');
    this.logoutLink = page.locator('a:has-text("Logout")');
  }

  async logout() {
    await this.userDropdownIcon.click();
    await this.logoutLink.click();
  }
}
