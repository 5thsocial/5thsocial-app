import { Schema } from 'mongoose';
export declare const CampaignsAudiencesSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}, {} & {
    name: string;
    status_code: "deleted" | "draft" | "archived" | "ready";
    parent_id: string;
    campaigns_audiences_id: string;
    size_estimate: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    filter_expr?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{} & {
    name: string;
    status_code: "deleted" | "draft" | "archived" | "ready";
    parent_id: string;
    campaigns_audiences_id: string;
    size_estimate: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    filter_expr?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: {
        createdAt: string;
        updatedAt: string;
    };
}>> & import("mongoose").FlatRecord<{} & {
    name: string;
    status_code: "deleted" | "draft" | "archived" | "ready";
    parent_id: string;
    campaigns_audiences_id: string;
    size_estimate: number;
    status_date?: NativeDate | null | undefined;
    deleted_at?: NativeDate | null | undefined;
    filter_expr?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
