import { z } from 'zod';
export const PostsReactionsCreateDto = z.object({
  posts_reactions_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  usr_user_id: z.string().uuid(),
  reaction_type: z.enum(['like','love','insightful','funny','angry']),
  status_code: z.enum(['active','deleted']).default('active')
  });
export type PostsReactionsCreate = z.infer<typeof PostsReactionsCreateDto>;
export const PostsReactionsUpdateDto = PostsReactionsCreateDto.partial();
export type PostsReactionsUpdate = z.infer<typeof PostsReactionsUpdateDto>;
