import { z } from 'zod';
export declare const CampaignsMetricsCreateDto: z.ZodObject<{
    campaigns_metrics_id: z.ZodString;
    parent_id: z.ZodString;
    yyyymmdd: z.ZodString;
    sent: z.ZodDefault<z.ZodNumber>;
    delivered: z.ZodDefault<z.ZodNumber>;
    opened: z.ZodDefault<z.ZodNumber>;
    clicked: z.ZodDefault<z.ZodNumber>;
    converted: z.ZodDefault<z.ZodNumber>;
    status_code: z.ZodDefault<z.ZodEnum<["active", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    status_code: "active" | "deleted";
    parent_id: string;
    yyyymmdd: string;
    campaigns_metrics_id: string;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
}, {
    parent_id: string;
    yyyymmdd: string;
    campaigns_metrics_id: string;
    status_code?: "active" | "deleted" | undefined;
    sent?: number | undefined;
    delivered?: number | undefined;
    opened?: number | undefined;
    clicked?: number | undefined;
    converted?: number | undefined;
}>;
export type CampaignsMetricsCreate = z.infer<typeof CampaignsMetricsCreateDto>;
export declare const CampaignsMetricsUpdateDto: z.ZodObject<{
    campaigns_metrics_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    yyyymmdd: z.ZodOptional<z.ZodString>;
    sent: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    delivered: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    opened: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    clicked: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    converted: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    yyyymmdd?: string | undefined;
    campaigns_metrics_id?: string | undefined;
    sent?: number | undefined;
    delivered?: number | undefined;
    opened?: number | undefined;
    clicked?: number | undefined;
    converted?: number | undefined;
}, {
    status_code?: "active" | "deleted" | undefined;
    parent_id?: string | undefined;
    yyyymmdd?: string | undefined;
    campaigns_metrics_id?: string | undefined;
    sent?: number | undefined;
    delivered?: number | undefined;
    opened?: number | undefined;
    clicked?: number | undefined;
    converted?: number | undefined;
}>;
export type CampaignsMetricsUpdate = z.infer<typeof CampaignsMetricsUpdateDto>;
