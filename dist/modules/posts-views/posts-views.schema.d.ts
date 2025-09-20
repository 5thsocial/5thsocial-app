import { Schema } from 'mongoose';
export declare const PostsViewsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    status_code: "active" | "deleted";
    parent_id: string;
    posts_views_id: string;
    viewed_at: NativeDate;
    usr_user_id?: string | null | undefined;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    session_id?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    status_code: "active" | "deleted";
    parent_id: string;
    posts_views_id: string;
    viewed_at: NativeDate;
    usr_user_id?: string | null | undefined;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    session_id?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    status_code: "active" | "deleted";
    parent_id: string;
    posts_views_id: string;
    viewed_at: NativeDate;
    usr_user_id?: string | null | undefined;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    session_id?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
