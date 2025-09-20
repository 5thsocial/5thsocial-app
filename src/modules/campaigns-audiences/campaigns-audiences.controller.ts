import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { CampaignsAudiencesService } from './campaigns-audiences.service.js';
import { CampaignsAudiencesCreateDto, CampaignsAudiencesUpdateDto } from './campaigns-audiences.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('campaigns-audiences')
@Controller('campaigns/:parentId/audiences')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CampaignsAudiencesController {
  constructor(private readonly svc: CampaignsAudiencesService) { }

  @Get()
  @Roles('user', 'admin')
  @ApiResponse({ status: 200, description: 'List items' })
  list(@Param('parentId') parentId: string) { return this.svc.list(parentId); }

  @Post()
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(CampaignsAudiencesCreateDto))
  @ApiBody({ schema: { example: {
  "campaigns_audiences_id": "UUID",
  "parent_id": "CMP_UUID",
  "name": "Early Adopters"
} } })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Param('parentId') parentId: string, @Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(CampaignsAudiencesUpdateDto))
  @ApiBody({ schema: { example: {
  "campaigns_audiences_id": "UUID",
  "parent_id": "CMP_UUID",
  "name": "Early Adopters"
} } })
  @ApiResponse({ status: 200, description: 'Updated' })
  update(@Param('parentId') parentId: string, @Param('id') id: string, @Body() body: any) { return this.svc.update(id, parentId, body); }

  @Delete(':id')
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'Soft-deleted' })
  remove(@Param('parentId') parentId: string, @Param('id') id: string) { return this.svc.remove(id, parentId); }
}