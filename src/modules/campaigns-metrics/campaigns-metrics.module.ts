import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsMetricsController } from './campaigns-metrics.controller.js';
import { CampaignsMetricsService } from './campaigns-metrics.service.js';
import { CampaignsMetricsSchema } from './campaigns-metrics.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'CampaignsMetrics', schema: CampaignsMetricsSchema, collection: 'campaigns-metrics' }])],
  controllers: [CampaignsMetricsController],
  providers: [CampaignsMetricsService],
})
export class CampaignsMetricsModule { }
