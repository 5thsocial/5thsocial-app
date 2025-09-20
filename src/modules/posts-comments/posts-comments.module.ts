import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsCommentsController } from './posts-comments.controller.js';
import { PostsCommentsService } from './posts-comments.service.js';
import { PostsCommentsSchema } from './posts-comments.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'PostsComments', schema: PostsCommentsSchema, collection: 'posts-comments' }])],
  controllers: [PostsCommentsController],
  providers: [PostsCommentsService],
})
export class PostsCommentsModule { }
