import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsAudiencesController } from './campaigns-audiences.controller.js';
import { CampaignsAudiencesService } from './campaigns-audiences.service.js';
import { CampaignsAudiencesSchema } from './campaigns-audiences.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'CampaignsAudiences', schema: CampaignsAudiencesSchema, collection: 'campaigns-audiences' }])],
  controllers: [CampaignsAudiencesController],
  providers: [CampaignsAudiencesService],
})
export class CampaignsAudiencesModule { }
