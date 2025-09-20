import { describe, it, expect } from 'vitest';
import { ProfileCreateDto } from '../src/modules/profiles/profile.dto';
describe('Profile DTO', () => {
  it('valid profile passes', () => {
    const r = ProfileCreateDto.safeParse({
      prf_profile_id: '00000000-0000-0000-0000-000000000000',
      usr_user_id: '00000000-0000-0000-0000-000000000001',
      prf_handle: 'grego', prf_display_name: 'Greg O', status_code: 'active'
    });
    expect(r.success).toBe(true);
  });
  it('bad handle fails', () => {
    const r = ProfileCreateDto.safeParse({
      prf_profile_id: '00000000-0000-0000-0000-000000000000',
      usr_user_id: '00000000-0000-0000-0000-000000000001',
      prf_handle: 'Bad Handle', prf_display_name: 'Greg O'
    });
    expect(r.success).toBe(false);
  });
});
