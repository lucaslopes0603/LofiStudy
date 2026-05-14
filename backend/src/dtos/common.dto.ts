import { z } from 'zod';

export const idParamSchema = z.object({
  params: z.object({ id: z.string().uuid() })
});

export const dateRangeQuerySchema = z.object({
  query: z.object({
    from: z.string().optional(),
    to: z.string().optional()
  }).optional()
});
