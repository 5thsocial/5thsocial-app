import { Schema } from 'mongoose';
export const PostsMetricsSchema = new Schema({

  posts_metrics_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  yyyymmdd: { type: String, match: /^\d{8}$/, required: true, index: true },
  views: { type: Number, min: 0, default: 0 },
  reactions: { type: Number, min: 0, default: 0 },
  comments: { type: Number, min: 0, default: 0 },
  shares: { type: Number, min: 0, default: 0 },
  status_code: { type: String, enum: ['active','deleted'], default: 'active' },
  status_date: { type: Date },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
