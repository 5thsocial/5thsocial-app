import { z } from 'zod';
export declare const PostsMetricsCreateDto: z.ZodObject<{
    posts_metrics_id: z.ZodString;
    parent_id: z.ZodString;
    yyyymmdd: z.ZodString;
    views: z.ZodDefault<z.ZodNumber>;
    reactions: z.ZodDefault<z.ZodNumber>;
    comments: z.ZodDefault<z.ZodNumber>;
    shares: z.ZodDefault<z.ZodNumber>;
    status_code: z.ZodDefault<z.ZodEnum<["active", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    status_code: "active" | "deleted";
    parent_id: string;
    posts_metrics_id: string;
    yyyymmdd: string;
    views: number;
    reactions: number;
    comments: number;
    shares: number;
}, {
    parent_id: string;
    posts_metrics_id: string;
    yyyymmdd: string;
    status_code?: "active" | "deleted" | undefined;
    views?: number | undefined;
    reactions?: number | undefined;
    comments?: number | undefined;
    shares?: number | undefined;
}>;
export type PostsMetricsCreate = z.infer<typeof PostsMetricsCreateDto>;
export declare const PostsMetricsUpdateDto: z.ZodObject<{
    posts_metrics_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    yyyymmdd: z.ZodOptional<z.ZodString>;
    views: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    reactions: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    comments: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    shares: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_metrics_id?: string | undefined;
    yyyymmdd?: string | undefined;
    views?: number | undefined;
    reactions?: number | undefined;
    comments?: number | undefined;
    shares?: number | undefined;
}, {
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    posts_metrics_id?: string | undefined;
    yyyymmdd?: string | undefined;
    views?: number | undefined;
    reactions?: number | undefined;
    comments?: number | undefined;
    shares?: number | undefined;
}>;
export type PostsMetricsUpdate = z.infer<typeof PostsMetricsUpdateDto>;
