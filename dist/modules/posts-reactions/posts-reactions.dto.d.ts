import { z } from 'zod';
export declare const PostsReactionsCreateDto: z.ZodObject<{
    posts_reactions_id: z.ZodString;
    parent_id: z.ZodString;
    usr_user_id: z.ZodString;
    reaction_type: z.ZodEnum<["like", "love", "insightful", "funny", "angry"]>;
    status_code: z.ZodDefault<z.ZodEnum<["active", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id: string;
    status_code: "active" | "deleted";
    parent_id: string;
    posts_reactions_id: string;
    reaction_type: "like" | "love" | "insightful" | "funny" | "angry";
}, {
    usr_user_id: string;
    parent_id: string;
    posts_reactions_id: string;
    reaction_type: "like" | "love" | "insightful" | "funny" | "angry";
    status_code?: "active" | "deleted" | undefined;
}>;
export type PostsReactionsCreate = z.infer<typeof PostsReactionsCreateDto>;
export declare const PostsReactionsUpdateDto: z.ZodObject<{
    posts_reactions_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    usr_user_id: z.ZodOptional<z.ZodString>;
    reaction_type: z.ZodOptional<z.ZodEnum<["like", "love", "insightful", "funny", "angry"]>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_reactions_id?: string | undefined;
    reaction_type?: "like" | "love" | "insightful" | "funny" | "angry" | undefined;
}, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_reactions_id?: string | undefined;
    reaction_type?: "like" | "love" | "insightful" | "funny" | "angry" | undefined;
}>;
export type PostsReactionsUpdate = z.infer<typeof PostsReactionsUpdateDto>;
