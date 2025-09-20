import { describe, it, expect, vi } from 'vitest';
import { CampaignsService } from '../src/modules/campaigns/campaigns.service';
// Mock Model
const model = {
    findOne: vi.fn(),
    save: vi.fn(),
    findOneAndUpdate: vi.fn()
};
// Mock CampaignsScheduler (second constructor parameter)
const mockScheduler = {
    schedule: vi.fn(),
    cancel: vi.fn(),
    // Add any other methods your scheduler has
};
describe('CampaignsService state machine', () => {
    it('schedule transitions draft->scheduled', async () => {
        const svc = new CampaignsService(model, mockScheduler);
        model.findOne.mockResolvedValue({
            status_code: 'draft',
            save: vi.fn().mockResolvedValue({}),
            toObject: () => ({ status_code: 'scheduled' }),
            cmp_campaign_id: 'x'
        });
        const res = await svc.schedule('x');
        expect(res?.status_code).toBe('scheduled');
    });
});
