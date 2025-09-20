import { z } from 'zod';
export const CampaignCreateDto = z.object({
  cmp_campaign_id: z.string().uuid(),
  usr_user_id: z.string().uuid().optional(),
  cmp_name: z.string().max(120),
  cmp_description: z.string().max(2000).optional(),
  cmp_objective: z.enum(['awareness','engagement','activation','conversion']),
  cmp_channel: z.array(z.enum(['inapp','email','sms','push','social'])).default([]),
  cmp_start_at: z.coerce.date().optional(),
  cmp_end_at: z.coerce.date().optional(),
  cmp_timezone: z.string().optional(),
  cmp_budget_cents: z.number().int().nonnegative().default(0),
  cmp_rate_limit_per_min: z.number().int().nonnegative().default(0),
  cmp_template_id: z.string().uuid().optional(),
  status_code: z.enum(['draft','scheduled','active','paused','completed','failed','deleted']).default('draft')
});
export type CampaignCreate = z.infer<typeof CampaignCreateDto>;
export const CampaignUpdateDto = CampaignCreateDto.partial();
export type CampaignUpdate = z.infer<typeof CampaignUpdateDto>;