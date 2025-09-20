"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsMetricsUpdateDto = exports.PostsMetricsCreateDto = void 0;
const zod_1 = require("zod");
exports.PostsMetricsCreateDto = zod_1.z.object({
    posts_metrics_id: zod_1.z.string().uuid(),
    parent_id: zod_1.z.string().uuid(),
    yyyymmdd: zod_1.z.string().regex(/^\d{8}$/),
    views: zod_1.z.number().int().nonnegative().default(0),
    reactions: zod_1.z.number().int().nonnegative().default(0),
    comments: zod_1.z.number().int().nonnegative().default(0),
    shares: zod_1.z.number().int().nonnegative().default(0),
    status_code: zod_1.z.enum(['active', 'deleted']).default('active')
});
exports.PostsMetricsUpdateDto = exports.PostsMetricsCreateDto.partial();
//# sourceMappingURL=posts-metrics.dto.js.map