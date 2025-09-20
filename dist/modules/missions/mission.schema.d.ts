import { Schema } from 'mongoose';
export declare const MissionSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    usr_user_id: string;
    status_code: "active" | "deleted" | "draft" | "paused" | "archived";
    msn_mission_id: string;
    msn_name: string;
    msn_objective: "custom" | "learn" | "build" | "sell" | "engage";
    msn_visibility: "public" | "private" | "team";
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    msn_description?: string | null | undefined;
    msn_estimated_minutes?: number | null | undefined;
    msn_prereq_mission_id?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    usr_user_id: string;
    status_code: "active" | "deleted" | "draft" | "paused" | "archived";
    msn_mission_id: string;
    msn_name: string;
    msn_objective: "custom" | "learn" | "build" | "sell" | "engage";
    msn_visibility: "public" | "private" | "team";
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    msn_description?: string | null | undefined;
    msn_estimated_minutes?: number | null | undefined;
    msn_prereq_mission_id?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    usr_user_id: string;
    status_code: "active" | "deleted" | "draft" | "paused" | "archived";
    msn_mission_id: string;
    msn_name: string;
    msn_objective: "custom" | "learn" | "build" | "sell" | "engage";
    msn_visibility: "public" | "private" | "team";
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    msn_description?: string | null | undefined;
    msn_estimated_minutes?: number | null | undefined;
    msn_prereq_mission_id?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
