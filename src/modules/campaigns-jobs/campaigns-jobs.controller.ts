import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { CampaignsJobsService } from './campaigns-jobs.service.js';
import { CampaignsJobsCreateDto, CampaignsJobsUpdateDto } from './campaigns-jobs.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('campaigns-jobs')
@Controller('campaigns/:parentId/jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CampaignsJobsController {
  constructor(private readonly svc: CampaignsJobsService) { }

  @Get()
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'List items' })
  list(@Param('parentId') parentId: string) { return this.svc.list(parentId); }

  @Post()
  @Roles('admin')
  @UsePipes(new ZodValidationPipe(CampaignsJobsCreateDto))
  @ApiBody({ schema: { example: {
  "campaigns_jobs_id": "UUID",
  "parent_id": "CMP_UUID",
  "job_type": "dispatch"
} } })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Param('parentId') parentId: string, @Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @Roles('admin')
  @UsePipes(new ZodValidationPipe(CampaignsJobsUpdateDto))
  @ApiBody({ schema: { example: {
  "campaigns_jobs_id": "UUID",
  "parent_id": "CMP_UUID",
  "job_type": "dispatch"
} } })
  @ApiResponse({ status: 200, description: 'Updated' })
  update(@Param('parentId') parentId: string, @Param('id') id: string, @Body() body: any) { return this.svc.update(id, parentId, body); }

  @Delete(':id')
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'Soft-deleted' })
  remove(@Param('parentId') parentId: string, @Param('id') id: string) { return this.svc.remove(id, parentId); }
}