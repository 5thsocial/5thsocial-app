import { z } from 'zod';
export const PostsMetricsCreateDto = z.object({
  posts_metrics_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  yyyymmdd: z.string().regex(/^\d{8}$/),
  views: z.number().int().nonnegative().default(0),
  reactions: z.number().int().nonnegative().default(0),
  comments: z.number().int().nonnegative().default(0),
  shares: z.number().int().nonnegative().default(0),
  status_code: z.enum(['active','deleted']).default('active')
  });
export type PostsMetricsCreate = z.infer<typeof PostsMetricsCreateDto>;
export const PostsMetricsUpdateDto = PostsMetricsCreateDto.partial();
export type PostsMetricsUpdate = z.infer<typeof PostsMetricsUpdateDto>;
