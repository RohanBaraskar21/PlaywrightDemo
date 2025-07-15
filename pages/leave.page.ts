import { Page, Locator } from '@playwright/test';

export class LeavePage {
  readonly page: Page;
  readonly leaveMenu: Locator;
  readonly applyLeaveButton: Locator;
  readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web';
    this.leaveMenu = page.locator('a[href*="leave/viewLeaveModule"]');
    this.applyLeaveButton = page.locator('button:has-text("Apply")');
  }

  async goto() {
    await this.page.goto(`${this.baseUrl}/index.php/leave/viewLeaveModule`, { timeout: 20000 });
  }

  async clickApplyLeave() {
    await this.applyLeaveButton.click();
  }
}
