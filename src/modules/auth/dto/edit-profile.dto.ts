import { z } from 'zod';

export const EditProfileDto = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email format').toLowerCase(),
});

export type EditProfileDto = z.infer<typeof EditProfileDto>;
