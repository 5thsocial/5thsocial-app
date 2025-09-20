import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
export declare class ModerationWorker extends WorkerHost {
    process(job: Job): Promise<void>;
    private handleProfileReview;
    private handlePostReview;
}
