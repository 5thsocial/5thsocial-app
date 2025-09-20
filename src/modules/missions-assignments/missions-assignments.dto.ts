import { z } from 'zod';
export const MissionsAssignmentsCreateDto = z.object({
  missions_assignments_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  assignee_prf_profile_id: z.string().uuid(),
  due_at: z.coerce.date().optional(),
  status_code: z.enum(['assigned','in_progress','completed','canceled','deleted']).default('assigned')
  });
export type MissionsAssignmentsCreate = z.infer<typeof MissionsAssignmentsCreateDto>;
export const MissionsAssignmentsUpdateDto = MissionsAssignmentsCreateDto.partial();
export type MissionsAssignmentsUpdate = z.infer<typeof MissionsAssignmentsUpdateDto>;
