import { Schema } from 'mongoose';
export declare const CampaignsJobsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    status_code: "deleted" | "queued" | "failed" | "canceled" | "running" | "succeeded";
    parent_id: string;
    campaigns_jobs_id: string;
    job_type: "pause" | "resume" | "dispatch" | "finalize";
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    scheduled_at?: NativeDate | null | undefined;
    started_at?: NativeDate | null | undefined;
    finished_at?: NativeDate | null | undefined;
    error_message?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    status_code: "deleted" | "queued" | "failed" | "canceled" | "running" | "succeeded";
    parent_id: string;
    campaigns_jobs_id: string;
    job_type: "pause" | "resume" | "dispatch" | "finalize";
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    scheduled_at?: NativeDate | null | undefined;
    started_at?: NativeDate | null | undefined;
    finished_at?: NativeDate | null | undefined;
    error_message?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    status_code: "deleted" | "queued" | "failed" | "canceled" | "running" | "succeeded";
    parent_id: string;
    campaigns_jobs_id: string;
    job_type: "pause" | "resume" | "dispatch" | "finalize";
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    scheduled_at?: NativeDate | null | undefined;
    started_at?: NativeDate | null | undefined;
    finished_at?: NativeDate | null | undefined;
    error_message?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
