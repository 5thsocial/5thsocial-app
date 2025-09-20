import { Schema } from 'mongoose';
export declare const PostSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    prf_profile_id: string;
    usr_user_id: string;
    status_code: "deleted" | "draft" | "queued" | "published" | "moderation";
    pst_post_id: string;
    pst_type: "text" | "link" | "image" | "video" | "poll";
    pst_tags: string[];
    pst_visibility: "public" | "followers" | "private";
    pst_attachments_count: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    pst_title?: string | null | undefined;
    pst_body?: string | null | undefined;
    pst_canonical_url?: string | null | undefined;
    pst_published_at?: NativeDate | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    prf_profile_id: string;
    usr_user_id: string;
    status_code: "deleted" | "draft" | "queued" | "published" | "moderation";
    pst_post_id: string;
    pst_type: "text" | "link" | "image" | "video" | "poll";
    pst_tags: string[];
    pst_visibility: "public" | "followers" | "private";
    pst_attachments_count: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    pst_title?: string | null | undefined;
    pst_body?: string | null | undefined;
    pst_canonical_url?: string | null | undefined;
    pst_published_at?: NativeDate | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    prf_profile_id: string;
    usr_user_id: string;
    status_code: "deleted" | "draft" | "queued" | "published" | "moderation";
    pst_post_id: string;
    pst_type: "text" | "link" | "image" | "video" | "poll";
    pst_tags: string[];
    pst_visibility: "public" | "followers" | "private";
    pst_attachments_count: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    pst_title?: string | null | undefined;
    pst_body?: string | null | undefined;
    pst_canonical_url?: string | null | undefined;
    pst_published_at?: NativeDate | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
