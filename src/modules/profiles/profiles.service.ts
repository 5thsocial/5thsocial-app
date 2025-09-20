import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProfile } from './interfaces/profile.interface.js';
import type { ProfileCreate, ProfileUpdate } from './profile.dto.js';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel('Profile') private model: Model<IProfile>) {}

  async create(dto: ProfileCreate): Promise<IProfile> { 
    return this.model.create({ 
      ...dto, 
      status_date: new Date() 
    }); 
  }

  async findAll(): Promise<IProfile[]> { 
    return this.model.find({ status_code: { $ne: 'deleted' } })
      .limit(200)
      .lean()
      .exec(); 
  }

  async findOne(id: string): Promise<IProfile | null> { 
    return this.model.findOne({ 
      prf_profile_id: id,
      status_code: { $ne: 'deleted' } 
    })
    .lean()
    .exec(); 
  }

  async findByUserId(userId: string): Promise<IProfile[]> {
    return this.model.find({ 
      usr_user_id: userId,
      status_code: { $ne: 'deleted' }
    })
    .lean()
    .exec();
  }

  async findByHandle(handle: string): Promise<IProfile | null> {
    return this.model.findOne({ 
      prf_handle: handle,
      status_code: { $ne: 'deleted' }
    })
    .lean()
    .exec();
  }

  async update(id: string, dto: ProfileUpdate): Promise<IProfile | null> { 
    return this.model.findOneAndUpdate(
      { 
        prf_profile_id: id,
        status_code: { $ne: 'deleted' } 
      }, 
      { 
        ...dto, 
        status_date: new Date() 
      }, 
      { new: true }
    )
    .lean()
    .exec(); 
  }

  async remove(id: string): Promise<IProfile | null> { 
    return this.model.findOneAndUpdate(
      { 
        prf_profile_id: id,
        status_code: { $ne: 'deleted' } 
      }, 
      { 
        status_code: 'deleted', 
        deleted_at: new Date(), 
        status_date: new Date() 
      }, 
      { new: true }
    )
    .lean()
    .exec(); 
  }

  async isHandleAvailable(handle: string, excludeProfileId?: string): Promise<boolean> {
    const query: any = { 
      prf_handle: handle,
      status_code: { $ne: 'deleted' }
    };
    
    if (excludeProfileId) {
      query.prf_profile_id = { $ne: excludeProfileId };
    }
    
    const existing = await this.model.findOne(query).lean().exec();
    return !existing;
  }

  async getProfileStats() {
    const pipeline = [
      { $match: { status_code: { $ne: 'deleted' } } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: { $sum: { $cond: [{ $eq: ['$status_code', 'active'] }, 1, 0] } },
          suspended: { $sum: { $cond: [{ $eq: ['$status_code', 'suspended'] }, 1, 0] } },
          hidden: { $sum: { $cond: [{ $eq: ['$status_code', 'hidden'] }, 1, 0] } },
          pendingModeration: { $sum: { $cond: [{ $eq: ['$prf_moderation_state', 'pending'] }, 1, 0] } },
          flagged: { $sum: { $cond: [{ $eq: ['$prf_moderation_state', 'flagged'] }, 1, 0] } }
        }
      }
    ];

    const result = await this.model.aggregate(pipeline).exec();
    return result[0] || {
      total: 0,
      active: 0,
      suspended: 0,
      hidden: 0,
      pendingModeration: 0,
      flagged: 0
    };
  }
}