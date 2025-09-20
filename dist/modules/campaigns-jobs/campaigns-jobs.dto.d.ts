import { z } from 'zod';
export declare const CampaignsJobsCreateDto: z.ZodObject<{
    campaigns_jobs_id: z.ZodString;
    parent_id: z.ZodString;
    job_type: z.ZodEnum<["dispatch", "pause", "resume", "finalize"]>;
    scheduled_at: z.ZodOptional<z.ZodDate>;
    started_at: z.ZodOptional<z.ZodDate>;
    finished_at: z.ZodOptional<z.ZodDate>;
    status_code: z.ZodDefault<z.ZodEnum<["queued", "running", "succeeded", "failed", "canceled", "deleted"]>>;
    error_message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status_code: "deleted" | "queued" | "failed" | "canceled" | "running" | "succeeded";
    parent_id: string;
    campaigns_jobs_id: string;
    job_type: "pause" | "resume" | "dispatch" | "finalize";
    scheduled_at?: Date | undefined;
    started_at?: Date | undefined;
    finished_at?: Date | undefined;
    error_message?: string | undefined;
}, {
    parent_id: string;
    campaigns_jobs_id: string;
    job_type: "pause" | "resume" | "dispatch" | "finalize";
    status_code?: "deleted" | "queued" | "failed" | "canceled" | "running" | "succeeded" | undefined;
    scheduled_at?: Date | undefined;
    started_at?: Date | undefined;
    finished_at?: Date | undefined;
    error_message?: string | undefined;
}>;
export type CampaignsJobsCreate = z.infer<typeof CampaignsJobsCreateDto>;
export declare const CampaignsJobsUpdateDto: z.ZodObject<{
    campaigns_jobs_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    job_type: z.ZodOptional<z.ZodEnum<["dispatch", "pause", "resume", "finalize"]>>;
    scheduled_at: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    started_at: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    finished_at: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["queued", "running", "succeeded", "failed", "canceled", "deleted"]>>>;
    error_message: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status_code?: "deleted" | "queued" | "failed" | "canceled" | "running" | "succeeded" | undefined;
    parent_id?: string | undefined;
    campaigns_jobs_id?: string | undefined;
    job_type?: "pause" | "resume" | "dispatch" | "finalize" | undefined;
    scheduled_at?: Date | undefined;
    started_at?: Date | undefined;
    finished_at?: Date | undefined;
    error_message?: string | undefined;
}, {
    status_code?: "deleted" | "queued" | "failed" | "canceled" | "running" | "succeeded" | undefined;
    parent_id?: string | undefined;
    campaigns_jobs_id?: string | undefined;
    job_type?: "pause" | "resume" | "dispatch" | "finalize" | undefined;
    scheduled_at?: Date | undefined;
    started_at?: Date | undefined;
    finished_at?: Date | undefined;
    error_message?: string | undefined;
}>;
export type CampaignsJobsUpdate = z.infer<typeof CampaignsJobsUpdateDto>;
