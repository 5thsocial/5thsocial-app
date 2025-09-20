"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUpdateDto = exports.PostCreateDto = void 0;
const zod_1 = require("zod");
exports.PostCreateDto = zod_1.z.object({
    pst_post_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid(),
    prf_profile_id: zod_1.z.string().uuid(),
    pst_type: zod_1.z.enum(['text', 'image', 'video', 'link', 'poll']),
    pst_title: zod_1.z.string().max(160).optional(),
    pst_body: zod_1.z.string().max(20000).optional(),
    pst_canonical_url: zod_1.z.string().url().max(512).optional(),
    pst_tags: zod_1.z.array(zod_1.z.string()).max(20).optional(),
    pst_visibility: zod_1.z.enum(['public', 'followers', 'private']).default('public'),
    status_code: zod_1.z.enum(['draft', 'queued', 'published', 'moderation', 'deleted']).default('draft')
});
exports.PostUpdateDto = exports.PostCreateDto.partial();
//# sourceMappingURL=post.dto.js.map