import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSharesController } from './posts-shares.controller.js';
import { PostsSharesService } from './posts-shares.service.js';
import { PostsSharesSchema } from './posts-shares.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'PostsShares', schema: PostsSharesSchema, collection: 'posts-shares' }])],
  controllers: [PostsSharesController],
  providers: [PostsSharesService],
})
export class PostsSharesModule { }
