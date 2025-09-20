import { z } from 'zod';
export const PostsCommentsCreateDto = z.object({
  posts_comments_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  usr_user_id: z.string().uuid(),
  prf_profile_id: z.string().uuid(),
  body: z.string().min(1).max(5000),
  status_code: z.enum(['visible','hidden','deleted']).default('visible')
  });
export type PostsCommentsCreate = z.infer<typeof PostsCommentsCreateDto>;
export const PostsCommentsUpdateDto = PostsCommentsCreateDto.partial();
export type PostsCommentsUpdate = z.infer<typeof PostsCommentsUpdateDto>;
