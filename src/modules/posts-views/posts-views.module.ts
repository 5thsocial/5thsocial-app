import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsViewsController } from './posts-views.controller.js';
import { PostsViewsService } from './posts-views.service.js';
import { PostsViewsSchema } from './posts-views.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'PostsViews', schema: PostsViewsSchema, collection: 'posts-views' }])],
  controllers: [PostsViewsController],
  providers: [PostsViewsService],
})
export class PostsViewsModule { }
