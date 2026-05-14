import { z } from 'zod';

export const reviewBody = z.object({
  subjectId: z.string().uuid(),
  studySessionId: z.string().uuid().optional().nullable(),
  title: z.string().min(2).max(180),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(['pending', 'done']).optional(),
  notes: z.string().max(2000).optional().nullable()
});

export const createReviewSchema = z.object({ body: reviewBody });
export const updateReviewSchema = z.object({ body: reviewBody.partial() });
