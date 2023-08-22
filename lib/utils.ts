import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class UtilsPage {
	readonly page: Page;
	readonly mentimeterURL: string;
	readonly presentationName: Locator;

	constructor(page: Page) {
		this.page = page;
	}

	async getAuthCookie(URL: string, email: string, psw: string) {
		let AuthCookie: string = '';
		await this.page.goto(`${URL}/ncos`);
		await this.page.locator('input[type="email"]').fill('qwe@qwe.com');
		await this.page.locator('input[type="submit"]').click();
		await this.page.locator('input[type="password"]').fill('qweqwe');
		await this.page.locator('input[type="submit"]').click();
		await this.page.getByRole('button', { name: 'Yes' }).click();

		await expect(
			this.page.getByRole('heading', { name: 'Welcome,' })
		).toBeVisible();
		const cookies = await this.page.context().cookies();

		for (let i = 0; i < cookies.length; i++) {
			if (cookies[i].name == '.AspNetCore.AzureADCookie') {
				AuthCookie = cookies[i].value;
				break;
			}
		}

		return AuthCookie;
	}
}
