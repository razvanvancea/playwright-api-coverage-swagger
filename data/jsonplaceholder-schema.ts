import { z } from 'zod';

export const getCommentByIdSchema = z.object({
	postId: z.number(),
	id: z.number(),
	name: z.string(),
	email: z.string(),
	body: z.string(),
});

export const getAllCommentsSchema = z.array(
	z.object({
		postId: z.number().optional(),
		id: z.number(),
		name: z.string(),
		email: z.string(),
		body: z.string(),
	})
);
