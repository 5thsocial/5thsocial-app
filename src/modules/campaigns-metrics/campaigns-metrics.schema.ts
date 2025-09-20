import { Schema } from 'mongoose';
export const CampaignsMetricsSchema = new Schema({

  campaigns_metrics_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  yyyymmdd: { type: String, match: /^\d{8}$/, required: true, index: true },
  sent: { type: Number, min: 0, default: 0 },
  delivered: { type: Number, min: 0, default: 0 },
  opened: { type: Number, min: 0, default: 0 },
  clicked: { type: Number, min: 0, default: 0 },
  converted: { type: Number, min: 0, default: 0 },
  status_code: { type: String, enum: ['active','deleted'], default: 'active' },
  status_date: { type: Date },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
