"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionUpdateDto = exports.MissionCreateDto = void 0;
const zod_1 = require("zod");
exports.MissionCreateDto = zod_1.z.object({
    msn_mission_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid(),
    msn_name: zod_1.z.string().max(120),
    msn_description: zod_1.z.string().max(4000).optional(),
    msn_objective: zod_1.z.enum(['learn', 'build', 'sell', 'engage', 'custom']),
    msn_visibility: zod_1.z.enum(['public', 'team', 'private']).default('public'),
    msn_estimated_minutes: zod_1.z.number().int().positive().optional(),
    msn_prereq_mission_id: zod_1.z.string().uuid().optional(),
    status_code: zod_1.z.enum(['draft', 'active', 'paused', 'archived', 'deleted']).default('draft')
});
exports.MissionUpdateDto = exports.MissionCreateDto.partial();
//# sourceMappingURL=mission.dto.js.map