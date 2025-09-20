"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsAssignmentsUpdateDto = exports.MissionsAssignmentsCreateDto = void 0;
const zod_1 = require("zod");
exports.MissionsAssignmentsCreateDto = zod_1.z.object({
    missions_assignments_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    assignee_prf_profile_id: zod_1.z.string().uuid(),
    due_at: zod_1.z.coerce.date().optional(),
    status_code: zod_1.z.enum(['assigned', 'in_progress', 'completed', 'canceled', 'deleted']).default('assigned')
});
exports.MissionsAssignmentsUpdateDto = exports.MissionsAssignmentsCreateDto.partial();
//# sourceMappingURL=missions-assignments.dto.js.map