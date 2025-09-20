"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileUpdateDto = exports.ProfileCreateDto = void 0;
const zod_1 = require("zod");
exports.ProfileCreateDto = zod_1.z.object({
    prf_profile_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid(),
    prf_handle: zod_1.z.string().regex(/^[a-z0-9_]{3,32}$/),
    prf_display_name: zod_1.z.string().min(1).max(80),
    prf_bio: zod_1.z.string().max(1000).optional(),
    prf_avatar_url: zod_1.z.string().url().max(1024).optional(),
    prf_banner_url: zod_1.z.string().url().max(1024).optional(),
    prf_visibility: zod_1.z.enum(['public', 'followers', 'private']).default('public'),
    prf_moderation_state: zod_1.z.enum(['pending', 'approved', 'flagged', 'removed']).default('approved'),
    status_code: zod_1.z.enum(['active', 'hidden', 'suspended', 'deleted']).default('active')
});
exports.ProfileUpdateDto = exports.ProfileCreateDto.partial();
//# sourceMappingURL=profile.dto.js.map