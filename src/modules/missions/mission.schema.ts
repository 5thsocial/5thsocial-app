import { Schema } from 'mongoose';
export const MissionSchema = new Schema({

  msn_mission_id: { type: String, required: true, unique: true, index: true },
  usr_user_id: { type: String, required: true, index: true },
  msn_name: { type: String, required: true, maxlength: 120 },
  msn_description: { type: String, maxlength: 4000 },
  msn_objective: { type: String, enum: ['learn','build','sell','engage','custom'], required: true },
  msn_visibility: { type: String, enum: ['public','team','private'], default: 'public' },
  msn_estimated_minutes: { type: Number, min: 1 },
  msn_prereq_mission_id: { type: String },
  status_code: { type: String, enum: ['draft','active','paused','archived','deleted'], default: 'draft' },
  status_date: { type: Date },
  deleted_at: { type: Date }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
