import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';  // ← Change this
import { Queue } from 'bullmq';
import { QUEUE_CAMPAIGNS } from './queue.tokens.js';

@Injectable()
export class CampaignsScheduler {
  constructor(@InjectQueue(QUEUE_CAMPAIGNS) private readonly queue: Queue) {}  // ← Change this

  async scheduleCampaign(id: string, startAt?: Date, endAt?: Date) {
    const now = new Date();
    if (startAt && startAt > now) {
      const delay = startAt.getTime() - now.getTime();
      await this.queue.add('dispatch', { id, scheduled: true }, { delay, jobId: `dispatch:${id}` });
    }
    if (endAt && endAt > now) {
      const delay = endAt.getTime() - now.getTime();
      await this.queue.add('pause', { id }, { delay, jobId: `pause:${id}` });
    }
  }
}