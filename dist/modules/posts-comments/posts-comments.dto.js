"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsCommentsUpdateDto = exports.PostsCommentsCreateDto = void 0;
const zod_1 = require("zod");
exports.PostsCommentsCreateDto = zod_1.z.object({
    posts_comments_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid(),
    prf_profile_id: zod_1.z.string().uuid(),
    body: zod_1.z.string().min(1).max(5000),
    status_code: zod_1.z.enum(['visible', 'hidden', 'deleted']).default('visible')
});
exports.PostsCommentsUpdateDto = exports.PostsCommentsCreateDto.partial();
//# sourceMappingURL=posts-comments.dto.js.map