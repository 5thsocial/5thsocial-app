import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';

@Injectable()
@Processor('moderation')
export class ModerationWorker extends WorkerHost {
  async process(job: Job): Promise<void> {
    switch (job.name) {
      case 'profile-review':
        await this.handleProfileReview(job);
        break;
      case 'post-review':
        await this.handlePostReview(job);
        break;
      default:
        console.warn(`Unknown job type: ${job.name}`);
    }
  }

  private async handleProfileReview(job: Job) {
    console.log('[moderation.profile-review]', job.data);
    // TODO: call LLM / heuristics; update prf_moderation_state
  }

  private async handlePostReview(job: Job) {
    console.log('[moderation.post-review]', job.data);
  }
}