import { Schema } from 'mongoose';
export const PostsReactionsSchema = new Schema({

  posts_reactions_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  usr_user_id: { type: String, required: true, index: true },
  reaction_type: { type: String, enum: ['like','love','insightful','funny','angry'], required: true },
  status_code: { type: String, enum: ['active','deleted'], default: 'active' },
  status_date: { type: Date },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
