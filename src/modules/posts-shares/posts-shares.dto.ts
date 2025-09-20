import { z } from 'zod';
export const PostsSharesCreateDto = z.object({
  posts_shares_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  usr_user_id: z.string().uuid(),
  destination: z.enum(['inapp','external']).default('inapp'),
  channel: z.string().max(64).optional(),
  status_code: z.enum(['active','deleted']).default('active')
}); 
export type PostsSharesCreate = z.infer<typeof PostsSharesCreateDto>;
export const PostsSharesUpdateDto = PostsSharesCreateDto.partial();
export type PostsSharesUpdate = z.infer<typeof PostsSharesUpdateDto>;