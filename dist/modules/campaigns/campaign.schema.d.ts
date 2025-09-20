import { Schema } from 'mongoose';
export declare const CampaignSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    usr_user_id: string;
    status_code: "active" | "deleted" | "draft" | "scheduled" | "paused" | "completed" | "failed";
    cmp_campaign_id: string;
    cmp_name: string;
    cmp_objective: "awareness" | "engagement" | "activation" | "conversion";
    cmp_channel: ("push" | "email" | "inapp" | "sms" | "social")[];
    cmp_budget_cents: number;
    cmp_rate_limit_per_min: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    cmp_description?: string | null | undefined;
    cmp_start_at?: NativeDate | null | undefined;
    cmp_end_at?: NativeDate | null | undefined;
    cmp_timezone?: string | null | undefined;
    cmp_template_id?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    usr_user_id: string;
    status_code: "active" | "deleted" | "draft" | "scheduled" | "paused" | "completed" | "failed";
    cmp_campaign_id: string;
    cmp_name: string;
    cmp_objective: "awareness" | "engagement" | "activation" | "conversion";
    cmp_channel: ("push" | "email" | "inapp" | "sms" | "social")[];
    cmp_budget_cents: number;
    cmp_rate_limit_per_min: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    cmp_description?: string | null | undefined;
    cmp_start_at?: NativeDate | null | undefined;
    cmp_end_at?: NativeDate | null | undefined;
    cmp_timezone?: string | null | undefined;
    cmp_template_id?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    usr_user_id: string;
    status_code: "active" | "deleted" | "draft" | "scheduled" | "paused" | "completed" | "failed";
    cmp_campaign_id: string;
    cmp_name: string;
    cmp_objective: "awareness" | "engagement" | "activation" | "conversion";
    cmp_channel: ("push" | "email" | "inapp" | "sms" | "social")[];
    cmp_budget_cents: number;
    cmp_rate_limit_per_min: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    cmp_description?: string | null | undefined;
    cmp_start_at?: NativeDate | null | undefined;
    cmp_end_at?: NativeDate | null | undefined;
    cmp_timezone?: string | null | undefined;
    cmp_template_id?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
