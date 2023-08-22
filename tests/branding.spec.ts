import { expect, test } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('brands suite', async () => {
	test.beforeAll(async () => {
		console.log('before all ');
	});

	//COVERAGE_TAG: GET https://api.practicesoftwaretesting.co/brands/
	test('GET branding', async ({ request }) => {
		const resp = await request.get(`${process.env.URL}brands/`);
		expect(resp.status()).toBe(200);
	});
});
