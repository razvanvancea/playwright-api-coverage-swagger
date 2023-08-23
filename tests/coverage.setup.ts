import { getEndpointCoverage } from '../lib/helpers/coverage';
import { test as coverage } from '@playwright/test';

coverage('calculate coverage', async () => {
	await getEndpointCoverage('api');
});
