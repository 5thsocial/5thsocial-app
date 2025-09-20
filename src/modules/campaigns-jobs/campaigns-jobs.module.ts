import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsJobsController } from './campaigns-jobs.controller.js';
import { CampaignsJobsService } from './campaigns-jobs.service.js';
import { CampaignsJobsSchema } from './campaigns-jobs.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'CampaignsJobs', schema: CampaignsJobsSchema, collection: 'campaigns-jobs' }])],
  controllers: [CampaignsJobsController],
  providers: [CampaignsJobsService],
})
export class CampaignsJobsModule { }
