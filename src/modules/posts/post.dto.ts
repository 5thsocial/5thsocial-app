import { z } from 'zod';
export const PostCreateDto = z.object({
  pst_post_id: z.string().uuid(),
  usr_user_id: z.string().uuid(),
  prf_profile_id: z.string().uuid(),
  pst_type: z.enum(['text','image','video','link','poll']),
  pst_title: z.string().max(160).optional(),
  pst_body: z.string().max(20000).optional(),
  pst_canonical_url: z.string().url().max(512).optional(),
  pst_tags: z.array(z.string()).max(20).optional(),
  pst_visibility: z.enum(['public','followers','private']).default('public'),
  status_code: z.enum(['draft','queued','published','moderation','deleted']).default('draft')
});
export type PostCreate = z.infer<typeof PostCreateDto>;
export const PostUpdateDto = PostCreateDto.partial();
export type PostUpdate = z.infer<typeof PostUpdateDto>;
