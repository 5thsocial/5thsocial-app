import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionsService } from './missions.service.js';
import { MissionsController } from './missions.controller.js';
import { MissionSchema } from './mission.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Mission', schema: MissionSchema, collection: 'missions' }])],
  controllers: [MissionsController],
  providers: [MissionsService],
  exports: [MongooseModule, MissionsService]
})
export class MissionsModule { }
