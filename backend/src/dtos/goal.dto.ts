import { z } from 'zod';

export const goalBody = z.object({
  title: z.string().min(2).max(160),
  scope: z.enum(['daily', 'weekly_subject']),
  targetMinutes: z.coerce.number().int().min(1).max(10080),
  subjectId: z.string().uuid().optional().nullable(),
  startsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endsOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable()
});

export const createGoalSchema = z.object({ body: goalBody });
export const updateGoalSchema = z.object({ body: goalBody.partial() });
