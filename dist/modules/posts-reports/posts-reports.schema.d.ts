import { Schema } from 'mongoose';
export declare const PostsReportsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    usr_user_id: string;
    status_code: "deleted" | "open" | "reviewed" | "dismissed";
    parent_id: string;
    posts_reports_id: string;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    reason?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    usr_user_id: string;
    status_code: "deleted" | "open" | "reviewed" | "dismissed";
    parent_id: string;
    posts_reports_id: string;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    reason?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    usr_user_id: string;
    status_code: "deleted" | "open" | "reviewed" | "dismissed";
    parent_id: string;
    posts_reports_id: string;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    reason?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
