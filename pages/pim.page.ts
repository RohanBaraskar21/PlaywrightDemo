import { Page, Locator } from '@playwright/test';

export class PIMPage {
  readonly page: Page;
  readonly pimMenu: Locator;
  readonly employeeListTab: Locator;
  readonly addEmployeeButton: Locator;
  readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web';
    this.pimMenu = page.locator('a[href*="pim/viewPimModule"]');
    this.employeeListTab = page.locator('span:has-text("Employee List")');
    this.addEmployeeButton = page.locator('button:has-text("Add")');
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/index.php/pim/viewPimModule`, { timeout: 20000 });
  }

  async clickAddEmployee() {
    await this.addEmployeeButton.click();
  }
}
