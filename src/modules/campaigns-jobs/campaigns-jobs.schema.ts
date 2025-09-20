import { Schema } from 'mongoose';
export const CampaignsJobsSchema = new Schema({

  campaigns_jobs_id: { type: String, required: true, unique: true, index: true },
  parent_id: { type: String, required: true, index: true },
  job_type: { type: String, enum: ['dispatch','pause','resume','finalize'], required: true },
  scheduled_at: { type: Date },
  started_at: { type: Date },
  finished_at: { type: Date },
  status_code: { type: String, enum: ['queued','running','succeeded','failed','canceled','deleted'], default: 'queued' },
  status_date: { type: Date },
  error_message: { type: String, maxlength: 2000 },
  deleted_at: { type: Date }
  
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
