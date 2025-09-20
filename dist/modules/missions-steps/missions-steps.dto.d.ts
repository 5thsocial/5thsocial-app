import { z } from 'zod';
export declare const MissionsStepsCreateDto: z.ZodObject<{
    missions_steps_id: z.ZodString;
    parent_id: z.ZodString;
    order: z.ZodNumber;
    title: z.ZodString;
    body: z.ZodOptional<z.ZodString>;
    status_code: z.ZodDefault<z.ZodEnum<["active", "archived", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    status_code: "active" | "deleted" | "archived";
    title: string;
    parent_id: string;
    missions_steps_id: string;
    order: number;
    body?: string | undefined;
}, {
    title: string;
    parent_id: string;
    missions_steps_id: string;
    order: number;
    status_code?: "active" | "deleted" | "archived" | undefined;
    body?: string | undefined;
}>;
export type MissionsStepsCreate = z.infer<typeof MissionsStepsCreateDto>;
export declare const MissionsStepsUpdateDto: z.ZodObject<{
    missions_steps_id: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    body: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "archived", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    status_code?: "active" | "deleted" | "archived" | undefined;
    title?: string | undefined;
    parent_id?: string | undefined;
    body?: string | undefined;
    missions_steps_id?: string | undefined;
    order?: number | undefined;
}, {
    status_code?: "active" | "deleted" | "archived" | undefined;
    title?: string | undefined;
    parent_id?: string | undefined;
    body?: string | undefined;
    missions_steps_id?: string | undefined;
    order?: number | undefined;
}>;
export type MissionsStepsUpdate = z.infer<typeof MissionsStepsUpdateDto>;
