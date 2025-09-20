import { Schema } from 'mongoose';
export declare const PostsMetricsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    status_code: "active" | "deleted";
    parent_id: string;
    posts_metrics_id: string;
    yyyymmdd: string;
    views: number;
    reactions: number;
    comments: number;
    shares: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    status_code: "active" | "deleted";
    parent_id: string;
    posts_metrics_id: string;
    yyyymmdd: string;
    views: number;
    reactions: number;
    comments: number;
    shares: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    status_code: "active" | "deleted";
    parent_id: string;
    posts_metrics_id: string;
    yyyymmdd: string;
    views: number;
    reactions: number;
    comments: number;
    shares: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
