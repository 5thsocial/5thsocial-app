import { z } from 'zod';
export declare const PostsCommentsCreateDto: z.ZodObject<{
    posts_comments_id: z.ZodString;
    parent_id: z.ZodString;
    usr_user_id: z.ZodString;
    prf_profile_id: z.ZodString;
    body: z.ZodString;
    status_code: z.ZodDefault<z.ZodEnum<["visible", "hidden", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    prf_profile_id: string;
    usr_user_id: string;
    status_code: "hidden" | "deleted" | "visible";
    parent_id: string;
    posts_comments_id: string;
    body: string;
}, {
    prf_profile_id: string;
    usr_user_id: string;
    parent_id: string;
    posts_comments_id: string;
    body: string;
    status_code?: "hidden" | "deleted" | "visible" | undefined;
}>;
export type PostsCommentsCreate = z.infer<typeof PostsCommentsCreateDto>;
export declare const PostsCommentsUpdateDto: z.ZodObject<{
    posts_comments_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    usr_user_id: z.ZodOptional<z.ZodString>;
    prf_profile_id: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodString>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["visible", "hidden", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    prf_profile_id?: string | undefined;
    usr_user_id?: string | undefined;
    status_code?: "hidden" | "deleted" | "visible" | undefined;
    parent_id?: string | undefined;
    posts_comments_id?: string | undefined;
    body?: string | undefined;
}, {
    prf_profile_id?: string | undefined;
    usr_user_id?: string | undefined;
    status_code?: "hidden" | "deleted" | "visible" | undefined;
    parent_id?: string | undefined;
    posts_comments_id?: string | undefined;
    body?: string | undefined;
}>;
export type PostsCommentsUpdate = z.infer<typeof PostsCommentsUpdateDto>;
