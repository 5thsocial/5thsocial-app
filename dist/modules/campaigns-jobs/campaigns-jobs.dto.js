"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsJobsUpdateDto = exports.CampaignsJobsCreateDto = void 0;
const zod_1 = require("zod");
exports.CampaignsJobsCreateDto = zod_1.z.object({
    campaigns_jobs_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    job_type: zod_1.z.enum(['dispatch', 'pause', 'resume', 'finalize']),
    scheduled_at: zod_1.z.coerce.date().optional(),
    started_at: zod_1.z.coerce.date().optional(),
    finished_at: zod_1.z.coerce.date().optional(),
    status_code: zod_1.z.enum(['queued', 'running', 'succeeded', 'failed', 'canceled', 'deleted']).default('queued'),
    error_message: zod_1.z.string().max(2000).optional()
});
exports.CampaignsJobsUpdateDto = exports.CampaignsJobsCreateDto.partial();
//# sourceMappingURL=campaigns-jobs.dto.js.map