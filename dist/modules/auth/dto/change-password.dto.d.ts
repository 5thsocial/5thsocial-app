import { z } from 'zod';
export declare const ChangePasswordDto: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    oldPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;
}, {
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;
}>, {
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;
}, {
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;
}>, {
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;
}, {
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;
}>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordDto>;
