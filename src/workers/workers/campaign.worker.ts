import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';

@Injectable()
@Processor('campaigns')
export class CampaignWorker extends WorkerHost {
  async process(job: Job): Promise<void> {
    switch (job.name) {
      case 'dispatch':
        await this.handleDispatch(job);
        break;
      case 'pause':
        await this.handlePause(job);
        break;
      case 'resume':
        await this.handleResume(job);
        break;
      case 'finalize':
        await this.handleFinalize(job);
        break;
      default:
        console.warn(`Unknown job type: ${job.name}`);
    }
  }

  private async handleDispatch(job: Job) {
    console.log('[campaigns.dispatch]', job.data);
    // TODO: deliver messages (email/sms/inapp) via providers
  }

  private async handlePause(job: Job) {
    console.log('[campaigns.pause]', job.data);
  }

  private async handleResume(job: Job) {
    console.log('[campaigns.resume]', job.data);
  }

  private async handleFinalize(job: Job) {
    console.log('[campaigns.finalize]', job.data);
  }
}