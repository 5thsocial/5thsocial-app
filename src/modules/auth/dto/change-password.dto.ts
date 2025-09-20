import { z } from 'zod';

export const ChangePasswordDto = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "New password and confirm password don't match",
    path: ["confirmPassword"],
  }
).refine(
  (data) => data.oldPassword !== data.newPassword,
  {
    message: "New password must be different from old password",
    path: ["newPassword"],
  }
);

export type ChangePasswordDto = z.infer<typeof ChangePasswordDto>;