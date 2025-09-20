import { z } from 'zod';
export declare const ForgetPasswordDto: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const VerifyOtpDto: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    otp: string;
}, {
    email: string;
    otp: string;
}>;
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
export type ForgetPasswordDto = z.infer<typeof ForgetPasswordDto>;
export type VerifyOtpDto = z.infer<typeof VerifyOtpDto>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordDto>;
