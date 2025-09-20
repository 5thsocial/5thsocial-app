import { Queue } from 'bullmq';
import { CampaignsService } from './campaigns.service.js';
import { type CampaignCreate, type CampaignUpdate } from './campaign.dto.js';
import type { JwtUser } from '../auth/jwt.strategy.js';
export declare class CampaignsController {
    private readonly svc;
    private q;
    constructor(svc: CampaignsService, q: Queue);
    create(user: JwtUser, body: CampaignCreate): Promise<any>;
    findAll(user: JwtUser): Promise<any[]>;
    findOne(user: JwtUser, id: string): Promise<any>;
    update(user: JwtUser, id: string, body: CampaignUpdate): Promise<any>;
    remove(user: JwtUser, id: string): Promise<any>;
    schedule(user: JwtUser, id: string): Promise<any>;
    activate(user: JwtUser, id: string): Promise<any>;
    pause(user: JwtUser, id: string): Promise<any>;
    finalize(user: JwtUser, id: string): Promise<any>;
}
