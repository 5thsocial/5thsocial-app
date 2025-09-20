"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsReportsUpdateDto = exports.PostsReportsCreateDto = void 0;
const zod_1 = require("zod");
exports.PostsReportsCreateDto = zod_1.z.object({
    posts_reports_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid(),
    reason: zod_1.z.string().max(2000).optional(),
    status_code: zod_1.z.enum(['open', 'reviewed', 'dismissed', 'deleted']).default('open')
});
exports.PostsReportsUpdateDto = exports.PostsReportsCreateDto.partial();
//# sourceMappingURL=posts-reports.dto.js.map