import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesService } from './profiles.service.js';
import { ProfilesController } from './profiles.controller.js';
import { ProfileSchema } from './profile.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema, collection: 'profiles' }])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [MongooseModule, ProfilesService]
})
export class ProfilesModule { }
