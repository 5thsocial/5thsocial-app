import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { PostsCommentsService } from './posts-comments.service.js';
import { PostsCommentsCreateDto, PostsCommentsUpdateDto } from './posts-comments.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('posts-comments')
@Controller('posts/:parentId/comments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsCommentsController {
  constructor(private readonly svc: PostsCommentsService) { }

  @Get()
  @Roles('user', 'admin')
  @ApiResponse({ status: 200, description: 'List items' })
  list(@Param('parentId') parentId: string) { return this.svc.list(parentId); }

  @Post()
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(PostsCommentsCreateDto))
  @ApiBody({ schema: { example: {
  "posts_comments_id": "UUID",
  "parent_id": "POST_UUID",
  "usr_user_id": "UUID",
  "prf_profile_id": "UUID",
  "body": "Nice post!"
} } })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Param('parentId') parentId: string, @Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(PostsCommentsUpdateDto))
  @ApiBody({ schema: { example: {
  "posts_comments_id": "UUID",
  "parent_id": "POST_UUID",
  "usr_user_id": "UUID",
  "prf_profile_id": "UUID",
  "body": "Nice post!"
} } })
  @ApiResponse({ status: 200, description: 'Updated' })
  update(@Param('parentId') parentId: string, @Param('id') id: string, @Body() body: any) { return this.svc.update(id, parentId, body); }

  @Delete(':id')
  @Roles('user', 'admin')
  @ApiResponse({ status: 200, description: 'Soft-deleted' })
  remove(@Param('parentId') parentId: string, @Param('id') id: string) { return this.svc.remove(id, parentId); }
}