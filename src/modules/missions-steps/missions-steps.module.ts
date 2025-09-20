import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionsStepsController } from './missions-steps.controller.js';
import { MissionsStepsService } from './missions-steps.service.js';
import { MissionsStepsSchema } from './missions-steps.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'MissionsSteps', schema: MissionsStepsSchema, collection: 'missions-steps' }])],
  controllers: [MissionsStepsController],
  providers: [MissionsStepsService],
})
export class MissionsStepsModule { }
