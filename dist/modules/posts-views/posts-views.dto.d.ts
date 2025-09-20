import { z } from 'zod';
export declare const PostsViewsCreateDto: z.ZodObject<{
    posts_views_id: z.ZodString;
    parent_id: z.ZodString;
    usr_user_id: z.ZodOptional<z.ZodString>;
    session_id: z.ZodOptional<z.ZodString>;
    viewed_at: z.ZodOptional<z.ZodDate>;
    status_code: z.ZodDefault<z.ZodEnum<["active", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    status_code: "active" | "deleted";
    parent_id: string;
    posts_views_id: string;
    usr_user_id?: string | undefined;
    session_id?: string | undefined;
    viewed_at?: Date | undefined;
}, {
    parent_id: string;
    posts_views_id: string;
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | undefined;
    session_id?: string | undefined;
    viewed_at?: Date | undefined;
}>;
export type PostsViewsCreate = z.infer<typeof PostsViewsCreateDto>;
export declare const PostsViewsUpdateDto: z.ZodObject<{
    posts_views_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    usr_user_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    session_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    viewed_at: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_views_id?: string | undefined;
    session_id?: string | undefined;
    viewed_at?: Date | undefined;
}, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_views_id?: string | undefined;
    session_id?: string | undefined;
    viewed_at?: Date | undefined;
}>;
export type PostsViewsUpdate = z.infer<typeof PostsViewsUpdateDto>;
