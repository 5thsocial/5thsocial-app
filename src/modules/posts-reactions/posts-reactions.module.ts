import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsReactionsController } from './posts-reactions.controller.js';
import { PostsReactionsService } from './posts-reactions.service.js';
import { PostsReactionsSchema } from './posts-reactions.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'PostsReactions', schema: PostsReactionsSchema, collection: 'posts-reactions' }])],
  controllers: [PostsReactionsController],
  providers: [PostsReactionsService],
})
export class PostsReactionsModule { }
