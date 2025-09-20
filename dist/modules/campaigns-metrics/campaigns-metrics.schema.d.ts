import { Schema } from 'mongoose';
export declare const CampaignsMetricsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    status_code: "active" | "deleted";
    parent_id: string;
    yyyymmdd: string;
    campaigns_metrics_id: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    status_code: "active" | "deleted";
    parent_id: string;
    yyyymmdd: string;
    campaigns_metrics_id: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    status_code: "active" | "deleted";
    parent_id: string;
    yyyymmdd: string;
    campaigns_metrics_id: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
