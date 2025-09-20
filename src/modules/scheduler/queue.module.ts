import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_CAMPAIGNS } from './queue.tokens.js';
import { CampaignsScheduler } from './scheduler.service.js';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_CAMPAIGNS,
    }),
  ],
  providers: [CampaignsScheduler],
  exports: [CampaignsScheduler, BullModule],
})
export class QueueModule {}