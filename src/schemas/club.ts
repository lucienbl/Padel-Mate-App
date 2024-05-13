import { z } from 'zod';

export const clubSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  fields: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    }),
  ),
});
