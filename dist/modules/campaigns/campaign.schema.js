"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CampaignSchema = new mongoose_1.Schema({
    cmp_campaign_id: { type: String, required: true, unique: true, index: true },
    usr_user_id: { type: String, required: true, index: true },
    cmp_name: { type: String, required: true, maxlength: 120 },
    cmp_description: { type: String, maxlength: 2000 },
    cmp_objective: { type: String, enum: ['awareness', 'engagement', 'activation', 'conversion'], required: true },
    cmp_channel: [{ type: String, enum: ['inapp', 'email', 'sms', 'push', 'social'] }],
    cmp_start_at: { type: Date },
    cmp_end_at: { type: Date },
    cmp_timezone: { type: String },
    cmp_budget_cents: { type: Number, min: 0, default: 0 },
    cmp_rate_limit_per_min: { type: Number, min: 0, default: 0 },
    cmp_template_id: { type: String },
    status_code: { type: String, enum: ['draft', 'scheduled', 'active', 'paused', 'completed', 'failed', 'deleted'], default: 'draft' },
    status_date: { type: Date },
    deleted_at: { type: Date }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
//# sourceMappingURL=campaign.schema.js.map