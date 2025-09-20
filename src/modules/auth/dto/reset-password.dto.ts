import { z } from 'zod';

export const ResetPasswordDto = z.object({
  email: z.string().email('Invalid email format').toLowerCase(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

export type ResetPasswordDto = z.infer<typeof ResetPasswordDto>;