import { z } from 'zod';
export const PostsBookmarksCreateDto = z.object({
  posts_bookmarks_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  usr_user_id: z.string().uuid(),
  status_code: z.enum(['active','deleted']).default('active')
  });
export type PostsBookmarksCreate = z.infer<typeof PostsBookmarksCreateDto>;
export const PostsBookmarksUpdateDto = PostsBookmarksCreateDto.partial();
export type PostsBookmarksUpdate = z.infer<typeof PostsBookmarksUpdateDto>;
