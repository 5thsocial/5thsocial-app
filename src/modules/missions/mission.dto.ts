import { z } from 'zod';
export const MissionCreateDto = z.object({
  msn_mission_id: z.string().uuid(),
  usr_user_id: z.string().uuid(),
  msn_name: z.string().max(120),
  msn_description: z.string().max(4000).optional(),
  msn_objective: z.enum(['learn','build','sell','engage','custom']),
  msn_visibility: z.enum(['public','team','private']).default('public'),
  msn_estimated_minutes: z.number().int().positive().optional(),
  msn_prereq_mission_id: z.string().uuid().optional(),
  status_code: z.enum(['draft','active','paused','archived','deleted']).default('draft')
});
export type MissionCreate = z.infer<typeof MissionCreateDto>;
export const MissionUpdateDto = MissionCreateDto.partial();
export type MissionUpdate = z.infer<typeof MissionUpdateDto>;
