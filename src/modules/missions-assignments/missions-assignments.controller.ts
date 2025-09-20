import { Controller, Get, Post, Patch, Delete, Param, Body, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { MissionsAssignmentsService } from './missions-assignments.service.js';
import { MissionsAssignmentsCreateDto, MissionsAssignmentsUpdateDto } from './missions-assignments.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('missions-assignments')
@Controller('missions/:parentId/assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MissionsAssignmentsController {
  constructor(private readonly svc: MissionsAssignmentsService) { }

  @Get()
  @Roles('user', 'admin')
  @ApiResponse({ status: 200, description: 'List items' })
  list(@Param('parentId') parentId: string) { return this.svc.list(parentId); }

  @Post()
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(MissionsAssignmentsCreateDto))
  @ApiBody({ schema: { example: {
  "missions_assignments_id": "UUID",
  "parent_id": "MISSION_UUID",
  "assignee_prf_profile_id": "PROFILE_UUID"
} } })
  @ApiResponse({ status: 201, description: 'Created' })
  create(@Param('parentId') parentId: string, @Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(MissionsAssignmentsUpdateDto))
  @ApiBody({ schema: { example: {
  "missions_assignments_id": "UUID",
  "parent_id": "MISSION_UUID",
  "assignee_prf_profile_id": "PROFILE_UUID"
} } })
  @ApiResponse({ status: 200, description: 'Updated' })
  update(@Param('parentId') parentId: string, @Param('id') id: string, @Body() body: any) { return this.svc.update(id, parentId, body); }

  @Delete(':id')
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'Soft-deleted' })
  remove(@Param('parentId') parentId: string, @Param('id') id: string) { return this.svc.remove(id, parentId); }
}