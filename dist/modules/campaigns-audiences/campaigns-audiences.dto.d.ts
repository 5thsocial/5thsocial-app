import { z } from 'zod';
export declare const CampaignsAudiencesCreateDto: z.ZodObject<{
    campaigns_audiences_id: z.ZodString;
    parent_id: z.ZodString;
    name: z.ZodString;
    filter_expr: z.ZodOptional<z.ZodString>;
    size_estimate: z.ZodDefault<z.ZodNumber>;
    status_code: z.ZodDefault<z.ZodEnum<["draft", "ready", "archived", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status_code: "deleted" | "draft" | "archived" | "ready";
    parent_id: string;
    campaigns_audiences_id: string;
    size_estimate: number;
    filter_expr?: string | undefined;
}, {
    name: string;
    parent_id: string;
    campaigns_audiences_id: string;
    status_code?: "deleted" | "draft" | "archived" | "ready" | undefined;
    filter_expr?: string | undefined;
    size_estimate?: number | undefined;
}>;
export type CampaignsAudiencesCreate = z.infer<typeof CampaignsAudiencesCreateDto>;
export declare const CampaignsAudiencesUpdateDto: z.ZodObject<{
    campaigns_audiences_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    filter_expr: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    size_estimate: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "ready", "archived", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    status_code?: "deleted" | "draft" | "archived" | "ready" | undefined;
    parent_id?: string | undefined;
    campaigns_audiences_id?: string | undefined;
    filter_expr?: string | undefined;
    size_estimate?: number | undefined;
}, {
    name?: string | undefined;
    status_code?: "deleted" | "draft" | "archived" | "ready" | undefined;
    parent_id?: string | undefined;
    campaigns_audiences_id?: string | undefined;
    filter_expr?: string | undefined;
    size_estimate?: number | undefined;
}>;
export type CampaignsAudiencesUpdate = z.infer<typeof CampaignsAudiencesUpdateDto>;
