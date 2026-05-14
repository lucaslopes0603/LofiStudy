import { z } from 'zod';

export const sessionBody = z.object({
  subjectId: z.string().uuid(),
  studiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  durationMinutes: z.coerce.number().int().min(1).max(1440),
  type: z.enum(['pomodoro', 'manual']),
  description: z.string().max(1200).optional().nullable(),
  focusLevel: z.coerce.number().int().min(1).max(5),
  difficultyLevel: z.coerce.number().int().min(1).max(5),
  reviewContent: z.boolean().optional().default(false),
  notes: z.string().max(5000).optional().nullable()
});

export const createSessionSchema = z.object({ body: sessionBody });
export const updateSessionSchema = z.object({ body: sessionBody.partial() });
