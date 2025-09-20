import { z } from 'zod';
export declare const PostsReportsCreateDto: z.ZodObject<{
    posts_reports_id: z.ZodString;
    parent_id: z.ZodString;
    usr_user_id: z.ZodString;
    reason: z.ZodOptional<z.ZodString>;
    status_code: z.ZodDefault<z.ZodEnum<["open", "reviewed", "dismissed", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id: string;
    status_code: "deleted" | "open" | "reviewed" | "dismissed";
    parent_id: string;
    posts_reports_id: string;
    reason?: string | undefined;
}, {
    usr_user_id: string;
    parent_id: string;
    posts_reports_id: string;
    status_code?: "deleted" | "open" | "reviewed" | "dismissed" | undefined;
    reason?: string | undefined;
}>;
export type PostsReportsCreate = z.infer<typeof PostsReportsCreateDto>;
export declare const PostsReportsUpdateDto: z.ZodObject<{
    posts_reports_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    usr_user_id: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["open", "reviewed", "dismissed", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id?: string | undefined;
    status_code?: "deleted" | "open" | "reviewed" | "dismissed" | undefined;
    parent_id?: string | undefined;
    posts_reports_id?: string | undefined;
    reason?: string | undefined;
}, {
    usr_user_id?: string | undefined;
    status_code?: "deleted" | "open" | "reviewed" | "dismissed" | undefined;
    parent_id?: string | undefined;
    posts_reports_id?: string | undefined;
    reason?: string | undefined;
}>;
export type PostsReportsUpdate = z.infer<typeof PostsReportsUpdateDto>;
