import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { MissionCreate, MissionUpdate } from './mission.dto.js';

@Injectable()
export class MissionsService {
  constructor(@InjectModel('Mission') private model: Model<any>) { }
  create(dto: MissionCreate) { return this.model.create({ ...dto, status_date: new Date() }); }
  findAll() { return this.model.find().limit(200).lean(); }
  findOne(id: string) { return this.model.findOne({ mission_id: id }).lean(); }
  update(id: string, dto: MissionUpdate) { return this.model.findOneAndUpdate({ mission_id: id }, { ...dto, status_date: new Date() }, { new: true }); }
  remove(id: string) { return this.model.findOneAndUpdate({ mission_id: id }, { status_code: 'deleted', deleted_at: new Date(), status_date: new Date() }, { new: true }); }
  
}
