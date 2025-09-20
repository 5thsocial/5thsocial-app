import { z } from 'zod';
export const ProfileCreateDto = z.object({
  prf_profile_id: z.string().uuid(),
  usr_user_id: z.string().uuid(),
  prf_handle: z.string().regex(/^[a-z0-9_]{3,32}$/),
  prf_display_name: z.string().min(1).max(80),
  prf_bio: z.string().max(1000).optional(),
  prf_avatar_url: z.string().url().max(1024).optional(),
  prf_banner_url: z.string().url().max(1024).optional(),
  prf_visibility: z.enum(['public','followers','private']).default('public'),
  prf_moderation_state: z.enum(['pending','approved','flagged','removed']).default('approved'),
  status_code: z.enum(['active','hidden','suspended','deleted']).default('active')
});
export type ProfileCreate = z.infer<typeof ProfileCreateDto>;
export const ProfileUpdateDto = ProfileCreateDto.partial();
export type ProfileUpdate = z.infer<typeof ProfileUpdateDto>;
