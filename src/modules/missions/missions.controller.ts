import { Controller, Get, Post, Param, Body, Patch, Delete, UsePipes, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse} from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { MissionsService } from './missions.service.js';
import { MissionCreateDto, MissionUpdateDto } from './mission.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@ApiTags('missions')
@Controller('missions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MissionsController {
  constructor(private readonly svc: MissionsService) { }

  @Post()
  @Roles('user', 'admin')
  @ApiBody({ schema: { example: {
  "msn_mission_id": "UUID",
  "usr_user_id": "UUID",
  "msn_name": "Onboard",
  "msn_objective": "learn"
} } })
  @ApiResponse({ status: 201, description: 'Created' }) @UsePipes(new ZodValidationPipe(MissionCreateDto))
  create(@Body() body: any) { return this.svc.create(body); }

  @Get()
  @Roles('user', 'admin')
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  @Roles('user', 'admin')
  findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Patch(':id')
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(MissionUpdateDto))
  update(@Param('id') id: string, @Body() body: any) { return this.svc.update(id, body); }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}