import { Page, Locator } from '@playwright/test';

export class AdminPage {
  readonly page: Page;
  readonly adminMenu: Locator;
  readonly userManagementTab: Locator;
  readonly searchInput: Locator;
  readonly addButton: Locator;
  readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web';
    this.adminMenu = page.locator('a[href*="admin/viewAdminModule"]');
    this.userManagementTab = page.locator("//h6[normalize-space()='User Management']");
    this.searchInput = page.locator('input[placeholder="Search"]');
    this.addButton = page.locator('button:has-text("Add")');
  }

async goto() {
  await this.page.goto(`${this.baseUrl}/index.php/admin/viewAdminModule`, { timeout: 20000 });
}

  async searchUser(username: string) {
    await this.searchInput.fill(username);
    await this.page.keyboard.press('Enter');
  }

  async clickAddUser() {
    await this.addButton.click();
  }
}
