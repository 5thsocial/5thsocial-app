import { Schema } from 'mongoose';
export const ProfileSchema = new Schema({

  prf_profile_id: { type: String, required: true, unique: true, index: true },
  usr_user_id: { type: String, required: true, index: true },
  prf_handle: { type: String, required: true, match: /^[a-z0-9_]{3,32}$/ },
  prf_display_name: { type: String, required: true, minlength: 1, maxlength: 80 },
  prf_bio: { type: String, maxlength: 1000 },
  prf_avatar_url: { type: String, maxlength: 1024 },
  prf_banner_url: { type: String, maxlength: 1024 },
  prf_visibility: { type: String, enum: ['public','followers','private'], default: 'public' },
  prf_moderation_state: { type: String, enum: ['pending','approved','flagged','removed'], default: 'approved' },
  prf_moderation_reason: { type: String, maxlength: 2000 },
  dag_score: { type: Number, min: 0, default: 0 },
  status_code: { type: String, enum: ['active','hidden','suspended','deleted'], default: 'active' },
  status_date: { type: Date },
  deleted_at: { type: Date }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
