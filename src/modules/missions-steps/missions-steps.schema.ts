import { Schema } from 'mongoose';
export const MissionsStepsSchema = new Schema({

  missions_steps_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  order: { type: Number, min: 1, required: true, index: true },
  title: { type: String, maxlength: 160, required: true },
  body: { type: String, maxlength: 8000 },
  status_code: { type: String, enum: ['active','archived','deleted'], default: 'active' },
  status_date: { type: Date },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
