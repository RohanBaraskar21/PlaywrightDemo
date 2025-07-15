import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly url: string;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentials: Locator;
  readonly usernameRequired: Locator;
  readonly passwordRequired: Locator;

  constructor(page: Page) {
    this.page = page;
    const baseUrl = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web';
    this.url = `${baseUrl}/index.php/auth/login`;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.invalidCredentials = page.locator('.oxd-alert-content-text');
    this.usernameRequired = page.locator('.oxd-input-group__message', { hasText: 'Required' }).first();
    this.passwordRequired = page.locator('.oxd-input-group__message', { hasText: 'Required' }).last();
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  invalidCredentialsMessage() {
    return this.invalidCredentials;
  }

  usernameRequiredMessage() {
    return this.usernameRequired;
  }

  passwordRequiredMessage() {
    return this.passwordRequired;
  }
}
