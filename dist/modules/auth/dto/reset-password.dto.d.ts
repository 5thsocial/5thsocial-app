import { z } from 'zod';
export declare const ResetPasswordDto: z.ZodEffects<z.ZodObject<{
    email: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    newPassword: string;
    confirmPassword: string;
}, {
    email: string;
    newPassword: string;
    confirmPassword: string;
}>, {
    email: string;
    newPassword: string;
    confirmPassword: string;
}, {
    email: string;
    newPassword: string;
    confirmPassword: string;
}>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordDto>;
