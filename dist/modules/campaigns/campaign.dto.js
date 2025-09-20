"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignUpdateDto = exports.CampaignCreateDto = void 0;
const zod_1 = require("zod");
exports.CampaignCreateDto = zod_1.z.object({
    cmp_campaign_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid().optional(),
    cmp_name: zod_1.z.string().max(120),
    cmp_description: zod_1.z.string().max(2000).optional(),
    cmp_objective: zod_1.z.enum(['awareness', 'engagement', 'activation', 'conversion']),
    cmp_channel: zod_1.z.array(zod_1.z.enum(['inapp', 'email', 'sms', 'push', 'social'])).default([]),
    cmp_start_at: zod_1.z.coerce.date().optional(),
    cmp_end_at: zod_1.z.coerce.date().optional(),
    cmp_timezone: zod_1.z.string().optional(),
    cmp_budget_cents: zod_1.z.number().int().nonnegative().default(0),
    cmp_rate_limit_per_min: zod_1.z.number().int().nonnegative().default(0),
    cmp_template_id: zod_1.z.string().uuid().optional(),
    status_code: zod_1.z.enum(['draft', 'scheduled', 'active', 'paused', 'completed', 'failed', 'deleted']).default('draft')
});
exports.CampaignUpdateDto = exports.CampaignCreateDto.partial();
//# sourceMappingURL=campaign.dto.js.map