"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const mongoose_1 = __importDefault(require("mongoose"));
const queue_tokens_js_1 = require("./queue.tokens.js");
const campaign_schema_js_1 = require("../campaigns/campaign.schema.js");
const connection = { url: process.env.REDIS_URL || 'redis://localhost:6379' };
const worker = new bullmq_1.Worker(queue_tokens_js_1.QUEUE_CAMPAIGNS, async (job) => {
    if (mongoose_1.default.connection.readyState === 0) {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/5thsocial');
    }
    const CampaignModel = mongoose_1.default.models['Campaign'] || mongoose_1.default.model('Campaign', campaign_schema_js_1.CampaignSchema);
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
//# sourceMappingURL=processor.js.map