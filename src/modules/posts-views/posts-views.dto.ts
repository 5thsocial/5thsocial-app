import { z } from 'zod';
export const PostsViewsCreateDto = z.object({ 
  posts_views_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  usr_user_id: z.string().uuid().optional(),
  session_id: z.string().max(128).optional(),
  viewed_at: z.coerce.date().optional(),
  status_code: z.enum(['active','deleted']).default('active')
});
export type PostsViewsCreate = z.infer<typeof PostsViewsCreateDto>;
export const PostsViewsUpdateDto = PostsViewsCreateDto.partial();
export type PostsViewsUpdate = z.infer<typeof PostsViewsUpdateDto>;