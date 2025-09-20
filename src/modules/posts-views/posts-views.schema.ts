import { Schema } from 'mongoose';
export const PostsViewsSchema = new Schema({

  posts_views_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  usr_user_id: { type: String, index: true },
  session_id: { type: String, maxlength: 128 },
  viewed_at: { type: Date, default: () => new Date() },
  status_code: { type: String, enum: ['active','deleted'], default: 'active' },
  status_date: { type: Date },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
