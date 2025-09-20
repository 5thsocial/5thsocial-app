import { Controller, Get, Post, Param, Body, Patch, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { PostsService } from './posts.service.js';
import { PostCreateDto, PostUpdateDto } from './post.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('posts')
@Controller('posts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostsController {
  constructor(private readonly svc: PostsService) { }

  @Post()
  @Roles('user', 'admin')
  @ApiBody({ schema: { example: {
  "pst_post_id": "UUID",
  "usr_user_id": "UUID",
  "prf_profile_id": "UUID",
  "pst_type": "text",
  "pst_title": "Hello"
} } })
  @ApiResponse({ status: 201, description: 'Created' }) @UsePipes(new ZodValidationPipe(PostCreateDto))
  create(@Body() body: any) { return this.svc.create(body); }

  @Get()
  @Roles('user', 'admin')
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  @Roles('user', 'admin')
  findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Patch(':id')
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(PostUpdateDto))
  update(@Param('id') id: string, @Body() body: any) { return this.svc.update(id, body); }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) { return this.svc.remove(id); }

  @Post(':id/publish')
  @Roles('user', 'admin')
  publish(@Param('id') id: string) { return this.svc.publish(id); }
}