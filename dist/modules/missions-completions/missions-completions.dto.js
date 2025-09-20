"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsCompletionsUpdateDto = exports.MissionsCompletionsCreateDto = void 0;
const zod_1 = require("zod");
exports.MissionsCompletionsCreateDto = zod_1.z.object({
    missions_completions_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    assignee_prf_profile_id: zod_1.z.string().uuid(),
    completed_at: zod_1.z.coerce.date().optional(),
    notes: zod_1.z.string().max(4000).optional(),
    status_code: zod_1.z.enum(['recorded', 'deleted']).default('recorded')
});
exports.MissionsCompletionsUpdateDto = exports.MissionsCompletionsCreateDto.partial();
//# sourceMappingURL=missions-completions.dto.js.map