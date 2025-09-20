import { 
  Controller, Get, Post, Param, Body, Patch, Delete, 
  UsePipes, UseGuards, NotFoundException, ForbiddenException 
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { CampaignsService } from './campaigns.service.js';
import { CampaignCreateDto, CampaignUpdateDto, type CampaignCreate, type CampaignUpdate } from './campaign.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/user.decorator.js';
import type { JwtUser } from '../auth/jwt.strategy.js';
import { QUEUE_CAMPAIGNS } from '../scheduler/queue.tokens.js';
import { UUIDValidationPipe } from '../../common/uuid.pipe.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';

@ApiTags('campaigns')
@Controller('campaigns')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CampaignsController {
  constructor(
    private readonly svc: CampaignsService,
    @InjectQueue(QUEUE_CAMPAIGNS) private q: Queue
  ) { }

  @Post()
  @Roles('user', 'admin')
  @ApiBody({ schema: { example: {
    "cmp_campaign_id": "UUID",
    "cmp_name": "Launch A",
    "cmp_objective": "awareness",
    "cmp_channel": ["inapp"]
  } } })
  @ApiResponse({ status: 201, description: 'Created' })
  @UsePipes(new ZodValidationPipe(CampaignCreateDto))
  create(@CurrentUser() user: JwtUser, @Body() body: CampaignCreate): Promise<any> {
    return this.svc.create({ ...body, usr_user_id: user.sub });
  }

  @Get()
  @Roles('user', 'admin')
  findAll(@CurrentUser() user: JwtUser): Promise<any[]> {
    return this.svc.findAll(user);
  }

  @Get(':id')
  @Roles('user', 'admin')
  async findOne(
    @CurrentUser() user: JwtUser,
    @Param('id', new UUIDValidationPipe()) id: string
  ): Promise<any> {
    const campaign = await this.svc.findOne(id, user);
    if (!campaign) throw new NotFoundException();
    return campaign;
  }

  @Patch(':id')
  @Roles('user', 'admin')
  @UsePipes(new ZodValidationPipe(CampaignUpdateDto))
  async update(
    @CurrentUser() user: JwtUser,
    @Param('id', new UUIDValidationPipe()) id: string,
    @Body() body: CampaignUpdate
  ): Promise<any> {
    const campaign = await this.svc.update(id, body, user);
    if (!campaign) throw new NotFoundException();
    return campaign;
  }

  @Delete(':id')
  @Roles('user', 'admin')
  async remove(
    @CurrentUser() user: JwtUser,
    @Param('id', new UUIDValidationPipe()) id: string
  ): Promise<any> {
    const campaign = await this.svc.remove(id, user);
    if (!campaign) throw new NotFoundException();
    return campaign;
  }

  @Post(':id/schedule')
  @Roles('user', 'admin')
  async schedule(
    @CurrentUser() user: JwtUser,
    @Param('id', new UUIDValidationPipe()) id: string
  ): Promise<any> {
    const campaign = await this.svc.schedule(id, user);
    if (!campaign) throw new NotFoundException();
    this.q.add('dispatch', { id, scheduled: true });
    return campaign;
  }

  @Post(':id/activate')
  @Roles('user', 'admin')
  async activate(
    @CurrentUser() user: JwtUser,
    @Param('id', new UUIDValidationPipe()) id: string
  ): Promise<any> {
    const campaign = await this.svc.activate(id, user);
    if (!campaign) throw new NotFoundException();
    this.q.add('dispatch', { id });
    return campaign;
  }

  @Post(':id/pause')
  @Roles('user', 'admin')
  async pause(
    @CurrentUser() user: JwtUser,
    @Param('id', new UUIDValidationPipe()) id: string
  ): Promise<any> {
    const campaign = await this.svc.pause(id, user);
    if (!campaign) throw new NotFoundException();
    this.q.add('pause', { id });
    return campaign;
  }

  @Post(':id/finalize')
  @Roles('user', 'admin')
  async finalize(
    @CurrentUser() user: JwtUser,
    @Param('id', new UUIDValidationPipe()) id: string
  ): Promise<any> {
    const campaign = await this.svc.finalize(id, user);
    if (!campaign) throw new NotFoundException();
    this.q.add('finalize', { id });
    return campaign;
  }
}