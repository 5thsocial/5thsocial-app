import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionsAssignmentsController } from './missions-assignments.controller.js';
import { MissionsAssignmentsService } from './missions-assignments.service.js';
import { MissionsAssignmentsSchema } from './missions-assignments.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'MissionsAssignments', schema: MissionsAssignmentsSchema, collection: 'missions-assignments' }])],
  controllers: [MissionsAssignmentsController],
  providers: [MissionsAssignmentsService],
})
export class MissionsAssignmentsModule { }
