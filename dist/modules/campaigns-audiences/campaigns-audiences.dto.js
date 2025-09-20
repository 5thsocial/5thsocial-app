"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsAudiencesUpdateDto = exports.CampaignsAudiencesCreateDto = void 0;
const zod_1 = require("zod");
exports.CampaignsAudiencesCreateDto = zod_1.z.object({
    campaigns_audiences_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    name: zod_1.z.string().max(120),
    filter_expr: zod_1.z.string().max(4000).optional(),
    size_estimate: zod_1.z.number().int().nonnegative().default(0),
    status_code: zod_1.z.enum(['draft', 'ready', 'archived', 'deleted']).default('draft')
});
exports.CampaignsAudiencesUpdateDto = exports.CampaignsAudiencesCreateDto.partial();
//# sourceMappingURL=campaigns-audiences.dto.js.map