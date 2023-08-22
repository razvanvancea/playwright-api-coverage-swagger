import { defineConfig, expect, devices } from '@playwright/test';

import { ZodTypeAny } from 'zod';

expect.extend({
	async toMatchSchema(received: any, schema: ZodTypeAny) {
		const response = await received.json();
		const result = await schema.safeParseAsync(response);
		if (result.success) {
			return {
				message: () => 'schema matched',
				pass: true,
			};
		} else {
			return {
				message: () =>
					'Result does not match schema: ' +
					result.error.issues.map((issue) => issue.message).join('\n') +
					'\n' +
					'Details: ' +
					JSON.stringify(result.error, null, 2),
				pass: false,
			};
		}
	},
});

export default defineConfig({
	testDir: './tests',
	outputDir: 'test-results',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: 1,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		screenshot: 'only-on-failure',
		ignoreHTTPSErrors: true,
		trace: 'on-first-retry',
		// extraHTTPHeaders: {
		//     			"playwright-solutions": "true",
		//   		},
	},
	expect: {
		timeout: 15 * 1000,
	},
	timeout: 30 * 1000,
	projects: [
		{
			name: 'Google Chrome',
			use: {
				...devices['Desktop Chrome'],
				channel: 'chrome',
				screenshot: 'only-on-failure',
			},
		},
		{ name: 'setup', testMatch: /coverage.setup.ts/ },
		{
			name: 'api-checks',
			dependencies: ['setup'],
		},
	],
});
