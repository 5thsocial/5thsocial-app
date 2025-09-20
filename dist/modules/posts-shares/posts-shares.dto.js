"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsSharesUpdateDto = exports.PostsSharesCreateDto = void 0;
const zod_1 = require("zod");
exports.PostsSharesCreateDto = zod_1.z.object({
    posts_shares_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid(),
    destination: zod_1.z.enum(['inapp', 'external']).default('inapp'),
    channel: zod_1.z.string().max(64).optional(),
    status_code: zod_1.z.enum(['active', 'deleted']).default('active')
});
exports.PostsSharesUpdateDto = exports.PostsSharesCreateDto.partial();
//# sourceMappingURL=posts-shares.dto.js.map