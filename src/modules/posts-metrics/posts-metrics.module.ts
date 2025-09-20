import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsMetricsController } from './posts-metrics.controller.js';
import { PostsMetricsService } from './posts-metrics.service.js';
import { PostsMetricsSchema } from './posts-metrics.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'PostsMetrics', schema: PostsMetricsSchema, collection: 'posts-metrics' }])],
  controllers: [PostsMetricsController],
  providers: [PostsMetricsService],
})
export class PostsMetricsModule { }
