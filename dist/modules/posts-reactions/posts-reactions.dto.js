"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsReactionsUpdateDto = exports.PostsReactionsCreateDto = void 0;
const zod_1 = require("zod");
exports.PostsReactionsCreateDto = zod_1.z.object({
    posts_reactions_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid(),
    reaction_type: zod_1.z.enum(['like', 'love', 'insightful', 'funny', 'angry']),
    status_code: zod_1.z.enum(['active', 'deleted']).default('active')
});
exports.PostsReactionsUpdateDto = exports.PostsReactionsCreateDto.partial();
//# sourceMappingURL=posts-reactions.dto.js.map