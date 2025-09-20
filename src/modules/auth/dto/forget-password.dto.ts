import { z } from 'zod';

export const ForgetPasswordDto = z.object({
  email: z.string().email('Invalid email format').toLowerCase(),
});

export const VerifyOtpDto = z.object({
  email: z.string().email('Invalid email format').toLowerCase(),
  otp: z.string().regex(/^\d{6}$/, 'OTP must be a 6-digit number'),
});

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

export type ForgetPasswordDto = z.infer<typeof ForgetPasswordDto>;
export type VerifyOtpDto = z.infer<typeof VerifyOtpDto>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordDto>;