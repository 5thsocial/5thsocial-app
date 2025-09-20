import { 
  Injectable, 
  NotFoundException, 
  ForbiddenException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignCreate, CampaignUpdate } from './campaign.dto.js';
import { CampaignsScheduler } from '../scheduler/scheduler.service.js';
import { JwtUser } from '../auth/jwt.strategy.js';

// Define complete interface for Campaign document
interface CampaignDocument {
  cmp_campaign_id: string;
  usr_user_id: string;
  cmp_name: string;
  cmp_description?: string;
  cmp_objective: string;
  cmp_channel: string[];
  cmp_start_at?: Date;
  cmp_end_at?: Date;
  cmp_timezone?: string;
  cmp_budget_cents?: number;
  cmp_rate_limit_per_min?: number;
  cmp_template_id?: string;
  cmp_metrics_snapshot?: object;
  status_code: string;
  status_date?: Date;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
  save: () => Promise<CampaignDocument>;
  toObject: () => any;
}

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel('Campaign') private model: Model<CampaignDocument>,
    private sched: CampaignsScheduler
  ) { }

  private async checkOwnership(id: string, user: JwtUser): Promise<CampaignDocument> {
    const campaign = await this.model.findOne({ cmp_campaign_id: id }).lean();
    if (!campaign) throw new NotFoundException();
    
    const userRoles = user.roles || [];
    if (!userRoles.includes('admin') && campaign.usr_user_id !== user.sub) {
      throw new ForbiddenException();
    }
    
    return campaign as unknown as CampaignDocument;
  }

  async create(dto: CampaignCreate) { 
    const c = await this.model.create({ ...dto, status_date: new Date() }); 
    await this.sched.scheduleCampaign(dto.cmp_campaign_id, dto.cmp_start_at, dto.cmp_end_at);
    return c.toObject(); 
  }

  async findAll(user: JwtUser) {
    const userRoles = user.roles || [];
    const filter = userRoles.includes('admin') 
      ? {} 
      : { usr_user_id: user.sub };
    return this.model.find(filter).limit(200).lean();
  }

  async findOne(id: string, user: JwtUser) {
    const userRoles = user.roles || [];
    const filter = userRoles.includes('admin')
      ? { cmp_campaign_id: id }
      : { cmp_campaign_id: id, usr_user_id: user.sub };
    return this.model.findOne(filter).lean();
  }

  async update(id: string, dto: CampaignUpdate, user: JwtUser) { 
    await this.checkOwnership(id, user);
    const u = await this.model.findOneAndUpdate(
      { cmp_campaign_id: id },
      { ...dto, status_date: new Date() },
      { new: true }
    ).lean();
    
    if (u) {
      const campaign = u as unknown as CampaignDocument;
      await this.sched.scheduleCampaign(id, campaign.cmp_start_at, campaign.cmp_end_at);
    }
    return u; 
  }

  async remove(id: string, user: JwtUser) {
    await this.checkOwnership(id, user);
    return this.model.findOneAndUpdate(
      { cmp_campaign_id: id },
      { status_code: 'deleted', deleted_at: new Date(), status_date: new Date() },
      { new: true }
    ).lean();
  }
  
  async schedule(id: string, user: JwtUser) {
    await this.checkOwnership(id, user);
    const c = await this.model.findOne({ cmp_campaign_id: id });
    if (!c) return null;
    if (c.status_code !== 'draft' && c.status_code !== 'paused') {
      throw new Error('Invalid state');
    }
    c.status_code = 'scheduled';
    c.status_date = new Date();
    await c.save();
    await this.sched.scheduleCampaign(id, c.cmp_start_at, c.cmp_end_at);
    return c.toObject();
  }

  async activate(id: string, user: JwtUser) {
    await this.checkOwnership(id, user);
    const c = await this.model.findOne({ cmp_campaign_id: id });
    if (!c) return null;
    if (c.status_code !== 'scheduled') throw new Error('Invalid state');
    c.status_code = 'active';
    c.status_date = new Date();
    await c.save();
    return c.toObject();
  }

  async pause(id: string, user: JwtUser) {
    await this.checkOwnership(id, user);
    const c = await this.model.findOne({ cmp_campaign_id: id });
    if (!c) return null;
    if (c.status_code !== 'active') throw new Error('Invalid state');
    c.status_code = 'paused';
    c.status_date = new Date();
    await c.save();
    return c.toObject();
  }

  async finalize(id: string, user: JwtUser) {
    await this.checkOwnership(id, user);
    const c = await this.model.findOne({ cmp_campaign_id: id });
    if (!c) return null;
    if (c.status_code !== 'active' && c.status_code !== 'paused') {
      throw new Error('Invalid state');
    }
    c.status_code = 'completed';
    c.status_date = new Date();
    await c.save();
    return c.toObject();
  }
}