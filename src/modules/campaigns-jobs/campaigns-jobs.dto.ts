import { z } from 'zod';
export const CampaignsJobsCreateDto = z.object({
  campaigns_jobs_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  job_type: z.enum(['dispatch','pause','resume','finalize']),
  scheduled_at: z.coerce.date().optional(),
  started_at: z.coerce.date().optional(),
  finished_at: z.coerce.date().optional(),
  status_code: z.enum(['queued','running','succeeded','failed','canceled','deleted']).default('queued'),
  error_message: z.string().max(2000).optional()
  });
export type CampaignsJobsCreate = z.infer<typeof CampaignsJobsCreateDto>;
export const CampaignsJobsUpdateDto = CampaignsJobsCreateDto.partial();
export type CampaignsJobsUpdate = z.infer<typeof CampaignsJobsUpdateDto>;
