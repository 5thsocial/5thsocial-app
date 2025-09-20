import { Schema } from 'mongoose';
export declare const PostsReactionsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    usr_user_id: string;
    status_code: "active" | "deleted";
    parent_id: string;
    posts_reactions_id: string;
    reaction_type: "like" | "love" | "insightful" | "funny" | "angry";
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    usr_user_id: string;
    status_code: "active" | "deleted";
    parent_id: string;
    posts_reactions_id: string;
    reaction_type: "like" | "love" | "insightful" | "funny" | "angry";
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    usr_user_id: string;
    status_code: "active" | "deleted";
    parent_id: string;
    posts_reactions_id: string;
    reaction_type: "like" | "love" | "insightful" | "funny" | "angry";
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
