import { Queue } from 'bullmq';
export declare class CampaignsScheduler {
    private readonly queue;
    constructor(queue: Queue);
    scheduleCampaign(id: string, startAt?: Date, endAt?: Date): Promise<void>;
}
