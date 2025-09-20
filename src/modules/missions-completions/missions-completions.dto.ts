import { z } from 'zod';
export const MissionsCompletionsCreateDto = z.object({
  missions_completions_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  assignee_prf_profile_id: z.string().uuid(),
  completed_at: z.coerce.date().optional(),
  notes: z.string().max(4000).optional(),
  status_code: z.enum(['recorded','deleted']).default('recorded')
 });
export type MissionsCompletionsCreate = z.infer<typeof MissionsCompletionsCreateDto>;
export const MissionsCompletionsUpdateDto = MissionsCompletionsCreateDto.partial();
export type MissionsCompletionsUpdate = z.infer<typeof MissionsCompletionsUpdateDto>;
