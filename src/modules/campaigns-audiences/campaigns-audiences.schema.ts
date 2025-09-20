import { Schema } from 'mongoose';
export const CampaignsAudiencesSchema = new Schema({

  campaigns_audiences_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  name: { type: String, maxlength: 120, required: true },
  filter_expr: { type: String, maxlength: 4000 },
  size_estimate: { type: Number, min: 0, default: 0 },
  status_code: { type: String, enum: ['draft','ready','archived','deleted'], default: 'draft' },
  status_date: { type: Date },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
