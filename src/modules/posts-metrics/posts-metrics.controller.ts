import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { PostsMetricsService } from './posts-metrics.service.js';
import { PostsMetricsCreateDto, PostsMetricsUpdateDto } from './posts-metrics.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('posts-metrics')
@Controller('posts/:parentId/metrics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsMetricsController {
  constructor(private readonly svc: PostsMetricsService) { }

  @Get()
  @Roles('user', 'admin')
  @ApiResponse({ status: 200, description: 'List items' })
  list(@Param('parentId') parentId: string) { return this.svc.list(parentId); }

  @Post()
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(PostsMetricsCreateDto))
  @ApiBody({ schema: { example: {
  "posts_metrics_id": "UUID",
  "parent_id": "POST_UUID",
  "yyyymmdd": "20250910",
  "views": 10,
  "reactions": 2,
  "comments": 1,
  "shares": 1
} } })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Param('parentId') parentId: string, @Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(PostsMetricsUpdateDto))
  @ApiBody({ schema: { example: {
  "posts_metrics_id": "UUID",
  "parent_id": "POST_UUID",
  "yyyymmdd": "20250910",
  "views": 10,
  "reactions": 2,
  "comments": 1,
  "shares": 1
} } })
  @ApiResponse({ status: 200, description: 'Updated' })
  update(@Param('parentId') parentId: string, @Param('id') id: string, @Body() body: any) { return this.svc.update(id, parentId, body); }

  @Delete(':id')
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'Soft-deleted' })
  remove(@Param('parentId') parentId: string, @Param('id') id: string) { return this.svc.remove(id, parentId); }
}