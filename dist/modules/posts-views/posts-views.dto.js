"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsViewsUpdateDto = exports.PostsViewsCreateDto = void 0;
const zod_1 = require("zod");
exports.PostsViewsCreateDto = zod_1.z.object({
    posts_views_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid().optional(),
    session_id: zod_1.z.string().max(128).optional(),
    viewed_at: zod_1.z.coerce.date().optional(),
    status_code: zod_1.z.enum(['active', 'deleted']).default('active')
});
exports.PostsViewsUpdateDto = exports.PostsViewsCreateDto.partial();
//# sourceMappingURL=posts-views.dto.js.map