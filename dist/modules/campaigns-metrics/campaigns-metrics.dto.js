"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsMetricsUpdateDto = exports.CampaignsMetricsCreateDto = void 0;
const zod_1 = require("zod");
exports.CampaignsMetricsCreateDto = zod_1.z.object({
    campaigns_metrics_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    yyyymmdd: zod_1.z.string().regex(/^\d{8}$/),
    sent: zod_1.z.number().int().nonnegative().default(0),
    delivered: zod_1.z.number().int().nonnegative().default(0),
    opened: zod_1.z.number().int().nonnegative().default(0),
    clicked: zod_1.z.number().int().nonnegative().default(0),
    converted: zod_1.z.number().int().nonnegative().default(0),
    status_code: zod_1.z.enum(['active', 'deleted']).default('active')
});
exports.CampaignsMetricsUpdateDto = exports.CampaignsMetricsCreateDto.partial();
//# sourceMappingURL=campaigns-metrics.dto.js.map