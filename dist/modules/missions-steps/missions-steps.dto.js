"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsStepsUpdateDto = exports.MissionsStepsCreateDto = void 0;
const zod_1 = require("zod");
exports.MissionsStepsCreateDto = zod_1.z.object({
    missions_steps_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    order: zod_1.z.number().int().positive(),
    title: zod_1.z.string().max(160),
    body: zod_1.z.string().max(8000).optional(),
    status_code: zod_1.z.enum(['active', 'archived', 'deleted']).default('active')
});
exports.MissionsStepsUpdateDto = exports.MissionsStepsCreateDto.partial();
//# sourceMappingURL=missions-steps.dto.js.map