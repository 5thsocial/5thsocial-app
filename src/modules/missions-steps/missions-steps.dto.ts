import { z } from 'zod';
export const MissionsStepsCreateDto = z.object({
  missions_steps_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  order: z.number().int().positive(),
  title: z.string().max(160),
  body: z.string().max(8000).optional(),
  status_code: z.enum(['active','archived','deleted']).default('active')
  });
export type MissionsStepsCreate = z.infer<typeof MissionsStepsCreateDto>;
export const MissionsStepsUpdateDto = MissionsStepsCreateDto.partial();
export type MissionsStepsUpdate = z.infer<typeof MissionsStepsUpdateDto>;
