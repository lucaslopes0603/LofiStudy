import { z } from 'zod';

export const subjectBody = z.object({
  name: z.string().min(2).max(120),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  weeklyGoalHours: z.coerce.number().min(0.5).max(80),
  description: z.string().max(1000).optional().nullable()
});

export const createSubjectSchema = z.object({ body: subjectBody });
export const updateSubjectSchema = z.object({ body: subjectBody.partial() });
