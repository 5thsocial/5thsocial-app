import { z } from 'zod';
export declare const MissionCreateDto: z.ZodObject<{
    msn_mission_id: z.ZodString;
    usr_user_id: z.ZodString;
    msn_name: z.ZodString;
    msn_description: z.ZodOptional<z.ZodString>;
    msn_objective: z.ZodEnum<["learn", "build", "sell", "engage", "custom"]>;
    msn_visibility: z.ZodDefault<z.ZodEnum<["public", "team", "private"]>>;
    msn_estimated_minutes: z.ZodOptional<z.ZodNumber>;
    msn_prereq_mission_id: z.ZodOptional<z.ZodString>;
    status_code: z.ZodDefault<z.ZodEnum<["draft", "active", "paused", "archived", "deleted"]>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id: string;
    status_code: "active" | "deleted" | "draft" | "paused" | "archived";
    msn_mission_id: string;
    msn_name: string;
    msn_objective: "custom" | "learn" | "build" | "sell" | "engage";
    msn_visibility: "public" | "private" | "team";
    msn_description?: string | undefined;
    msn_estimated_minutes?: number | undefined;
    msn_prereq_mission_id?: string | undefined;
}, {
    usr_user_id: string;
    msn_mission_id: string;
    msn_name: string;
    msn_objective: "custom" | "learn" | "build" | "sell" | "engage";
    status_code?: "active" | "deleted" | "draft" | "paused" | "archived" | undefined;
    msn_description?: string | undefined;
    msn_visibility?: "public" | "private" | "team" | undefined;
    msn_estimated_minutes?: number | undefined;
    msn_prereq_mission_id?: string | undefined;
}>;
export type MissionCreate = z.infer<typeof MissionCreateDto>;
export declare const MissionUpdateDto: z.ZodObject<{
    msn_mission_id: z.ZodOptional<z.ZodString>;
    usr_user_id: z.ZodOptional<z.ZodString>;
    msn_name: z.ZodOptional<z.ZodString>;
    msn_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    msn_objective: z.ZodOptional<z.ZodEnum<["learn", "build", "sell", "engage", "custom"]>>;
    msn_visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "team", "private"]>>>;
    msn_estimated_minutes: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    msn_prereq_mission_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status_code: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "active", "paused", "archived", "deleted"]>>>;
}, "strip", z.ZodTypeAny, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | "draft" | "paused" | "archived" | undefined;
    msn_mission_id?: string | undefined;
    msn_name?: string | undefined;
    msn_description?: string | undefined;
    msn_objective?: "custom" | "learn" | "build" | "sell" | "engage" | undefined;
    msn_visibility?: "public" | "private" | "team" | undefined;
    msn_estimated_minutes?: number | undefined;
    msn_prereq_mission_id?: string | undefined;
}, {
    usr_user_id?: string | undefined;
    status_code?: "active" | "deleted" | "draft" | "paused" | "archived" | undefined;
    msn_mission_id?: string | undefined;
    msn_name?: string | undefined;
    msn_description?: string | undefined;
    msn_objective?: "custom" | "learn" | "build" | "sell" | "engage" | undefined;
    msn_visibility?: "public" | "private" | "team" | undefined;
    msn_estimated_minutes?: number | undefined;
    msn_prereq_mission_id?: string | undefined;
}>;
export type MissionUpdate = z.infer<typeof MissionUpdateDto>;
