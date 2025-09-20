import { z } from 'zod';
export declare const EditProfileDto: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
}, {
    name: string;
    email: string;
}>;
export type EditProfileDto = z.infer<typeof EditProfileDto>;
