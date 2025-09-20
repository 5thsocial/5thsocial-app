import { z } from 'zod';
export declare const PostsBookmarksCreateDto: z.ZodObject<{
    posts_bookmarks_id: z.ZodString;
    parent_id: z.ZodString;
    usr_user_id: z.ZodString;
    status_code: z.ZodDefault<z.ZodEnum<["active", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id: string;
    status_code: "active" | "deleted";
    parent_id: string;
    posts_bookmarks_id: string;
}, {
    usr_user_id: string;
    parent_id: string;
    posts_bookmarks_id: string;
    status_code?: "active" | "deleted" | undefined;
}>;
export type PostsBookmarksCreate = z.infer<typeof PostsBookmarksCreateDto>;
export declare const PostsBookmarksUpdateDto: z.ZodObject<{
    posts_bookmarks_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    usr_user_id: z.ZodOptional<z.ZodString>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_bookmarks_id?: string | undefined;
}, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_bookmarks_id?: string | undefined;
}>;
export type PostsBookmarksUpdate = z.infer<typeof PostsBookmarksUpdateDto>;
