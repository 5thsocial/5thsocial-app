import { Schema } from 'mongoose';
export declare const MissionsCompletionsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    status_code: "deleted" | "recorded";
    parent_id: string;
    assignee_prf_profile_id: string;
    missions_completions_id: string;
    completed_at: NativeDate;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    notes?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    status_code: "deleted" | "recorded";
    parent_id: string;
    assignee_prf_profile_id: string;
    missions_completions_id: string;
    completed_at: NativeDate;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    notes?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    status_code: "deleted" | "recorded";
    parent_id: string;
    assignee_prf_profile_id: string;
    missions_completions_id: string;
    completed_at: NativeDate;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    notes?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
