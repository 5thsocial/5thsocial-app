import { Worker } from 'bullmq';
import mongoose from 'mongoose';
import { QUEUE_CAMPAIGNS } from './queue.tokens.js';
import { CampaignSchema } from '../campaigns/campaign.schema.js';

const connection = { url: process.env.REDIS_URL || 'redis://localhost:6379' };

const worker = new Worker(QUEUE_CAMPAIGNS, async (job) => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/5thsocial');
  }
  const CampaignModel = mongoose.models['Campaign'] || mongoose.model('Campaign', CampaignSchema);

  const id = job.data.id;

  if (job.name === 'dispatch') {
    console.log(`Dispatching campaign ${id}`);
    await CampaignModel.updateOne({ cmp_campaign_id: id }, { $set: { status_code: 'active', status_date: new Date() } });
  }

  if (job.name === 'pause') {
    console.log(`Pausing campaign ${id}`);
    await CampaignModel.updateOne({ cmp_campaign_id: id }, { $set: { status_code: 'paused', status_date: new Date() } });
  }

  if (job.name === 'finalize') {
    console.log(`Finalizing campaign ${id}`);
    await CampaignModel.updateOne({ cmp_campaign_id: id }, { $set: { status_code: 'completed', status_date: new Date() } });
  }

}, { connection });

console.log('[worker] Campaigns worker running...');