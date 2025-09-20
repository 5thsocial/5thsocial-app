import { z } from 'zod';
export declare const PostsSharesCreateDto: z.ZodObject<{
    posts_shares_id: z.ZodString;
    parent_id: z.ZodString;
    usr_user_id: z.ZodString;
    destination: z.ZodDefault<z.ZodEnum<["inapp", "external"]>>;
    channel: z.ZodOptional<z.ZodString>;
    status_code: z.ZodDefault<z.ZodEnum<["active", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id: string;
    status_code: "active" | "deleted";
    parent_id: string;
    posts_shares_id: string;
    destination: "inapp" | "external";
    channel?: string | undefined;
}, {
    usr_user_id: string;
    parent_id: string;
    posts_shares_id: string;
    status_code?: "active" | "deleted" | undefined;
    destination?: "inapp" | "external" | undefined;
    channel?: string | undefined;
}>;
export type PostsSharesCreate = z.infer<typeof PostsSharesCreateDto>;
export declare const PostsSharesUpdateDto: z.ZodObject<{
    posts_shares_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    usr_user_id: z.ZodOptional<z.ZodString>;
    destination: z.ZodOptional<z.ZodDefault<z.ZodEnum<["inapp", "external"]>>>;
    channel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_shares_id?: string | undefined;
    destination?: "inapp" | "external" | undefined;
    channel?: string | undefined;
}, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_shares_id?: string | undefined;
    destination?: "inapp" | "external" | undefined;
    channel?: string | undefined;
}>;
export type PostsSharesUpdate = z.infer<typeof PostsSharesUpdateDto>;
