import { Schema } from 'mongoose';
export declare const PostsCommentsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    prf_profile_id: string;
    usr_user_id: string;
    status_code: "hidden" | "deleted" | "visible";
    parent_id: string;
    posts_comments_id: string;
    body: string;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    prf_profile_id: string;
    usr_user_id: string;
    status_code: "hidden" | "deleted" | "visible";
    parent_id: string;
    posts_comments_id: string;
    body: string;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    prf_profile_id: string;
    usr_user_id: string;
    status_code: "hidden" | "deleted" | "visible";
    parent_id: string;
    posts_comments_id: string;
    body: string;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
