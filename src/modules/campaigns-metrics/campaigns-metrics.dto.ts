import { z } from 'zod';
export const CampaignsMetricsCreateDto = z.object({
  campaigns_metrics_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  yyyymmdd: z.string().regex(/^\d{8}$/),
  sent: z.number().int().nonnegative().default(0),
  delivered: z.number().int().nonnegative().default(0),
  opened: z.number().int().nonnegative().default(0),
  clicked: z.number().int().nonnegative().default(0),
  converted: z.number().int().nonnegative().default(0),
  status_code: z.enum(['active','deleted']).default('active')
  });
export type CampaignsMetricsCreate = z.infer<typeof CampaignsMetricsCreateDto>;
export const CampaignsMetricsUpdateDto = CampaignsMetricsCreateDto.partial();
export type CampaignsMetricsUpdate = z.infer<typeof CampaignsMetricsUpdateDto>;
