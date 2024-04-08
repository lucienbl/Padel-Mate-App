import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  id: z.string().uuid(),
});
