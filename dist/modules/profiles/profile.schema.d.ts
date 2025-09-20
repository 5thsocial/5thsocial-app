import { Schema } from 'mongoose';
export declare const ProfileSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    prf_profile_id: string;
    usr_user_id: string;
    prf_handle: string;
    prf_display_name: string;
    prf_visibility: "public" | "followers" | "private";
    prf_moderation_state: "pending" | "approved" | "flagged" | "removed";
    status_code: "hidden" | "active" | "suspended" | "deleted";
    dag_score: number;
    prf_bio?: string | null | undefined;
    prf_avatar_url?: string | null | undefined;
    prf_banner_url?: string | null | undefined;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    prf_moderation_reason?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    prf_profile_id: string;
    usr_user_id: string;
    prf_handle: string;
    prf_display_name: string;
    prf_visibility: "public" | "followers" | "private";
    prf_moderation_state: "pending" | "approved" | "flagged" | "removed";
    status_code: "hidden" | "active" | "suspended" | "deleted";
    dag_score: number;
    prf_bio?: string | null | undefined;
    prf_avatar_url?: string | null | undefined;
    prf_banner_url?: string | null | undefined;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    prf_moderation_reason?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    prf_profile_id: string;
    usr_user_id: string;
    prf_handle: string;
    prf_display_name: string;
    prf_visibility: "public" | "followers" | "private";
    prf_moderation_state: "pending" | "approved" | "flagged" | "removed";
    status_code: "hidden" | "active" | "suspended" | "deleted";
    dag_score: number;
    prf_bio?: string | null | undefined;
    prf_avatar_url?: string | null | undefined;
    prf_banner_url?: string | null | undefined;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    prf_moderation_reason?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
