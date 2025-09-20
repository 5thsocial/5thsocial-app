import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service.js';
import { PostsController } from './posts.controller.js';
import { PostSchema } from './post.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema, collection: 'posts' }])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [MongooseModule, PostsService]
})
export class PostsModule { }
