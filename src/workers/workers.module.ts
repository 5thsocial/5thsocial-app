import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CampaignWorker } from './workers/campaign.worker.js';
import { ModerationWorker } from './workers/moderation.worker.js';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'campaigns' }),
    BullModule.registerQueue({ name: 'moderation' }),
  ],
  providers: [CampaignWorker, ModerationWorker],
})
export class WorkersModule {}
