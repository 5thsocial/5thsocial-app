import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { PostsSharesService } from './posts-shares.service.js';
import { PostsSharesCreateDto, PostsSharesUpdateDto } from './posts-shares.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('posts-shares')
@Controller('posts/:parentId/shares')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsSharesController {
  constructor(private readonly svc: PostsSharesService) { }

  @Get()
  @Roles('user', 'admin')
  @ApiResponse({ status: 200, description: 'List items' })
  list(@Param('parentId') parentId: string) { return this.svc.list(parentId); }

  @Post()
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(PostsSharesCreateDto))
  @ApiBody({ schema: { example: {
  "posts_shares_id": "UUID",
  "parent_id": "POST_UUID",
  "usr_user_id": "UUID",
  "destination": "external",
  "channel": "twitter"
} } })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Param('parentId') parentId: string, @Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(PostsSharesUpdateDto))
  @ApiBody({ schema: { example: {
  "posts_shares_id": "UUID",
  "parent_id": "POST_UUID",
  "usr_user_id": "UUID",
  "destination": "external",
  "channel": "twitter"
} } })
  @ApiResponse({ status: 200, description: 'Updated' })
  update(@Param('parentId') parentId: string, @Param('id') id: string, @Body() body: any) { return this.svc.update(id, parentId, body); }

  @Delete(':id')
  @Roles('user', 'admin')
  @ApiResponse({ status: 200, description: 'Soft-deleted' })
  remove(@Param('parentId') parentId: string, @Param('id') id: string) { return this.svc.remove(id, parentId); }
}