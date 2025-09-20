"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsBookmarksUpdateDto = exports.PostsBookmarksCreateDto = void 0;
const zod_1 = require("zod");
exports.PostsBookmarksCreateDto = zod_1.z.object({
    posts_bookmarks_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    usr_user_id: zod_1.z.string().uuid(),
    status_code: zod_1.z.enum(['active', 'deleted']).default('active')
});
exports.PostsBookmarksUpdateDto = exports.PostsBookmarksCreateDto.partial();
//# sourceMappingURL=posts-bookmarks.dto.js.map