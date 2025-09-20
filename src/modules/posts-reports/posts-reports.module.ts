import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsReportsController } from './posts-reports.controller.js';
import { PostsReportsService } from './posts-reports.service.js';
import { PostsReportsSchema } from './posts-reports.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'PostsReports', schema: PostsReportsSchema, collection: 'posts-reports' }])],
  controllers: [PostsReportsController],
  providers: [PostsReportsService],
})
export class PostsReportsModule { }
