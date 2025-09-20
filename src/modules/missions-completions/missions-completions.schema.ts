import { Schema } from 'mongoose';
export const MissionsCompletionsSchema = new Schema({

  missions_completions_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  assignee_prf_profile_id: { type: String, required: true, index: true },
  completed_at: { type: Date, default: () => new Date() },
  notes: { type: String, maxlength: 4000 },
  status_code: { type: String, enum: ['recorded','deleted'], default: 'recorded' },
  status_date: { type: Date },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
