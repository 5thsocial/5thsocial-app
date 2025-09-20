import { Schema } from 'mongoose';
export declare const MissionsStepsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    status_code: "active" | "deleted" | "archived";
    title: string;
    parent_id: string;
    missions_steps_id: string;
    order: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    body?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    status_code: "active" | "deleted" | "archived";
    title: string;
    parent_id: string;
    missions_steps_id: string;
    order: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    body?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    status_code: "active" | "deleted" | "archived";
    title: string;
    parent_id: string;
    missions_steps_id: string;
    order: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    body?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
