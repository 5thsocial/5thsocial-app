import { z } from 'zod';
export const PostsReportsCreateDto = z.object({
  posts_reports_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  usr_user_id: z.string().uuid(),
  reason: z.string().max(2000).optional(),
  status_code: z.enum(['open','reviewed','dismissed','deleted']).default('open')
  });
export type PostsReportsCreate = z.infer<typeof PostsReportsCreateDto>;
export const PostsReportsUpdateDto = PostsReportsCreateDto.partial();
export type PostsReportsUpdate = z.infer<typeof PostsReportsUpdateDto>;
