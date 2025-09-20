import { Schema } from 'mongoose';
export const PostsSharesSchema = new Schema({

  posts_shares_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  usr_user_id: { type: String, required: true, index: true },
  destination: { type: String, enum: ['inapp','external'], default: 'inapp' },
  channel: { type: String, maxlength: 64 },
  status_code: { type: String, enum: ['active','deleted'], default: 'active' },
  status_date: { type: Date },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
