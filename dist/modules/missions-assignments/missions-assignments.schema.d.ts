import { Schema } from 'mongoose';
export declare const MissionsAssignmentsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    status_code: "deleted" | "completed" | "assigned" | "in_progress" | "canceled";
    parent_id: string;
    missions_assignments_id: string;
    assignee_prf_profile_id: string;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    due_at?: NativeDate | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    status_code: "deleted" | "completed" | "assigned" | "in_progress" | "canceled";
    parent_id: string;
    missions_assignments_id: string;
    assignee_prf_profile_id: string;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    due_at?: NativeDate | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    status_code: "deleted" | "completed" | "assigned" | "in_progress" | "canceled";
    parent_id: string;
    missions_assignments_id: string;
    assignee_prf_profile_id: string;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    due_at?: NativeDate | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
