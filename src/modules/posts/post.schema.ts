import { Schema } from 'mongoose';
export const PostSchema = new Schema({

  pst_post_id: { type: String, required: true, unique: true, index: true },
  usr_user_id: { type: String, required: true, index: true },
  prf_profile_id: { type: String, required: true, index: true },
  pst_type: { type: String, enum: ['text','image','video','link','poll'], required: true },
  pst_title: { type: String, maxlength: 160 },
  pst_body: { type: String, maxlength: 20000 },
  pst_canonical_url: { type: String, maxlength: 512 },
  pst_tags: [{ type: String }],
  pst_published_at: { type: Date },
  pst_visibility: { type: String, enum: ['public','followers','private'], default: 'public' },
  pst_attachments_count: { type: Number, min: 0, default: 0 },
  status_code: { type: String, enum: ['draft','queued','published','moderation','deleted'], default: 'draft' },
  status_date: { type: Date },
  deleted_at: { type: Date }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
