import { ZodTypeAny } from 'zod';

declare global {
	namespace PlaywrightTest {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		interface Matchers<R, T> {
			toMatchSchema(schema: ZodTypeAny): Promise<R>;
		}
	}
}
