import { z } from 'zod';
export declare const MissionsCompletionsCreateDto: z.ZodObject<{
    missions_completions_id: z.ZodString;
    parent_id: z.ZodString;
    assignee_prf_profile_id: z.ZodString;
    completed_at: z.ZodOptional<z.ZodDate>;
    notes: z.ZodOptional<z.ZodString>;
    status_code: z.ZodDefault<z.ZodEnum<["recorded", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    status_code: "deleted" | "recorded";
    parent_id: string;
    assignee_prf_profile_id: string;
    missions_completions_id: string;
    completed_at?: Date | undefined;
    notes?: string | undefined;
}, {
    parent_id: string;
    assignee_prf_profile_id: string;
    missions_completions_id: string;
    status_code?: "deleted" | "recorded" | undefined;
    completed_at?: Date | undefined;
    notes?: string | undefined;
}>;
export type MissionsCompletionsCreate = z.infer<typeof MissionsCompletionsCreateDto>;
export declare const MissionsCompletionsUpdateDto: z.ZodObject<{
    missions_completions_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    assignee_prf_profile_id: z.ZodOptional<z.ZodString>;
    completed_at: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["recorded", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    status_code?: "deleted" | "recorded" | undefined;
    parent_id?: string | undefined;
    assignee_prf_profile_id?: string | undefined;
    missions_completions_id?: string | undefined;
    completed_at?: Date | undefined;
    notes?: string | undefined;
}, {
    status_code?: "deleted" | "recorded" | undefined;
    parent_id?: string | undefined;
    assignee_prf_profile_id?: string | undefined;
    missions_completions_id?: string | undefined;
    completed_at?: Date | undefined;
    notes?: string | undefined;
}>;
export type MissionsCompletionsUpdate = z.infer<typeof MissionsCompletionsUpdateDto>;
