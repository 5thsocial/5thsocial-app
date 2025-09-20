import { z } from 'zod';
export declare const MissionsAssignmentsCreateDto: z.ZodObject<{
    missions_assignments_id: z.ZodString;
    parent_id: z.ZodString;
    assignee_prf_profile_id: z.ZodString;
    due_at: z.ZodOptional<z.ZodDate>;
    status_code: z.ZodDefault<z.ZodEnum<["assigned", "in_progress", "completed", "canceled", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    status_code: "deleted" | "completed" | "assigned" | "in_progress" | "canceled";
    parent_id: string;
    missions_assignments_id: string;
    assignee_prf_profile_id: string;
    due_at?: Date | undefined;
}, {
    parent_id: string;
    missions_assignments_id: string;
    assignee_prf_profile_id: string;
    status_code?: "deleted" | "completed" | "assigned" | "in_progress" | "canceled" | undefined;
    due_at?: Date | undefined;
}>;
export type MissionsAssignmentsCreate = z.infer<typeof MissionsAssignmentsCreateDto>;
export declare const MissionsAssignmentsUpdateDto: z.ZodObject<{
    missions_assignments_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    assignee_prf_profile_id: z.ZodOptional<z.ZodString>;
    due_at: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["assigned", "in_progress", "completed", "canceled", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    status_code?: "deleted" | "completed" | "assigned" | "in_progress" | "canceled" | undefined;
    parent_id?: string | undefined;
    missions_assignments_id?: string | undefined;
    assignee_prf_profile_id?: string | undefined;
    due_at?: Date | undefined;
}, {
    status_code?: "deleted" | "completed" | "assigned" | "in_progress" | "canceled" | undefined;
    parent_id?: string | undefined;
    missions_assignments_id?: string | undefined;
    assignee_prf_profile_id?: string | undefined;
    due_at?: Date | undefined;
}>;
export type MissionsAssignmentsUpdate = z.infer<typeof MissionsAssignmentsUpdateDto>;
