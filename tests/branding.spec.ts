import { expect, test, type Page } from '@playwright/test';
import { getExperiencesSchema } from '../data/get-experiences-schema';
import { UtilsPage } from 'lib';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('brands suite', async () => {
	let cookies;
	let bookingId;

	let page: Page;
	let ADCookie = '';

	test.beforeAll(async () => {
		console.log('before all ');
	});

	//COVERAGE_TAG: GET https://api.practicesoftwaretesting.co/brands/
	test('GET branding', async ({ request }) => {
		const resp = await request.get(`${process.env.URL}brands/`);
		expect(resp.status()).toBe(200);
	});
});
