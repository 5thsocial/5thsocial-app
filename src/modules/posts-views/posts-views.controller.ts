import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { PostsViewsService } from './posts-views.service.js';
import { PostsViewsCreateDto, PostsViewsUpdateDto } from './posts-views.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('posts-views')
@Controller('posts/:parentId/views')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsViewsController {
  constructor(private readonly svc: PostsViewsService) { }

  @Get()
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'List items' })
  list(@Param('parentId') parentId: string) { return this.svc.list(parentId); }

  @Post()
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(PostsViewsCreateDto))
  @ApiBody({ schema: { example: {
  "posts_views_id": "UUID",
  "parent_id": "POST_UUID",
  "usr_user_id": "UUID",
  "session_id": "abc"
} } })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Param('parentId') parentId: string, @Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @Roles('admin')
  @UsePipes(new ZodValidationPipe(PostsViewsUpdateDto))
  @ApiBody({ schema: { example: {
  "posts_views_id": "UUID",
  "parent_id": "POST_UUID",
  "usr_user_id": "UUID",
  "session_id": "abc"
} } })
  @ApiResponse({ status: 200, description: 'Updated' })
  update(@Param('parentId') parentId: string, @Param('id') id: string, @Body() body: any) { return this.svc.update(id, parentId, body); }

  @Delete(':id')
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'Soft-deleted' })
  remove(@Param('parentId') parentId: string, @Param('id') id: string) { return this.svc.remove(id, parentId); }
}