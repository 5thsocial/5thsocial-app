import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
export declare class CampaignWorker extends WorkerHost {
    process(job: Job): Promise<void>;
    private handleDispatch;
    private handlePause;
    private handleResume;
    private handleFinalize;
}
