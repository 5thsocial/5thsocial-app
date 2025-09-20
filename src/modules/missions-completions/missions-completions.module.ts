import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionsCompletionsController } from './missions-completions.controller.js';
import { MissionsCompletionsService } from './missions-completions.service.js';
import { MissionsCompletionsSchema } from './missions-completions.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'MissionsCompletions', schema: MissionsCompletionsSchema, collection: 'missions-completions' }])],
  controllers: [MissionsCompletionsController],
  providers: [MissionsCompletionsService],
})
export class MissionsCompletionsModule { }
