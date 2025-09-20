import { z } from 'zod';
export const CampaignsAudiencesCreateDto = z.object({
  campaigns_audiences_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  name: z.string().max(120),
  filter_expr: z.string().max(4000).optional(),
  size_estimate: z.number().int().nonnegative().default(0),
  status_code: z.enum(['draft','ready','archived','deleted']).default('draft')
 } );
export type CampaignsAudiencesCreate = z.infer<typeof CampaignsAudiencesCreateDto>;
export const CampaignsAudiencesUpdateDto = CampaignsAudiencesCreateDto.partial();
export type CampaignsAudiencesUpdate = z.infer<typeof CampaignsAudiencesUpdateDto>;
