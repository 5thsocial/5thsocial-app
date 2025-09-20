import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsService } from './campaigns.service.js';
import { CampaignsController } from './campaigns.controller.js';
import { CampaignSchema } from './campaign.schema.js';
import { QueueModule } from '../scheduler/queue.module.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Campaign', schema: CampaignSchema, collection: 'campaigns' }]), QueueModule],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [MongooseModule, CampaignsService]
})
export class CampaignsModule { }