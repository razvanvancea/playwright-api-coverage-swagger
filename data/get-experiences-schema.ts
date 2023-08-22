import { z } from 'zod';

export const getExperiencesSchema = z.array(
	z.object({
		Id: z.string(),
		Name: z.string(),
		Code: z.string(),
		Description: z.string(),
		Benefits: z.array(z.string()),
		Objectives: z.array(z.string()),
		Tags: z.array(z.string()),
		Order: z.number(),
		Featured: z.boolean(),
		Created: z.string(),
		Status: z.union([z.string(), z.null()]).optional(),
		CampaignTemplateId: z.union([z.string(), z.null()]).optional(),
		Images: z.array(
			z.object({
				Id: z.string(),
				Url: z.string(),
				IsIcon: z.boolean(),
				Created: z.string(),
			})
		),
		Clients: z.record(z.any()),
	})
);
