import { Schema } from 'mongoose';
export const MissionsAssignmentsSchema = new Schema({

  missions_assignments_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  assignee_prf_profile_id: { type: String, required: true, index: true },
  due_at: { type: Date },
  status_code: { type: String, enum: ['assigned','in_progress','completed','canceled','deleted'], default: 'assigned' },
  status_date: { type: Date },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
