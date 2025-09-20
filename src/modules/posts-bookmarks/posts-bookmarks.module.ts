import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsBookmarksController } from './posts-bookmarks.controller.js';
import { PostsBookmarksService } from './posts-bookmarks.service.js';
import { PostsBookmarksSchema } from './posts-bookmarks.schema.js';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'PostsBookmarks', schema: PostsBookmarksSchema, collection: 'posts-bookmarks' }])],
  controllers: [PostsBookmarksController],
  providers: [PostsBookmarksService],
})
export class PostsBookmarksModule { }
