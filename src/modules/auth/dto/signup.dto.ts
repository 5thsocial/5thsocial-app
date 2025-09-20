import { z } from 'zod';

export const SignupDto = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email format').toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type SignupDto = z.infer<typeof SignupDto>;