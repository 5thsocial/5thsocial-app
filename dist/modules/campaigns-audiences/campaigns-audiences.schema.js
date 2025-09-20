"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsAudiencesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CampaignsAudiencesSchema = new mongoose_1.Schema({
    campaigns_audiences_id: { type: String, required: true, unique: true, index: true },
    parent_id: { type: String, required: true, index: true },
    name: { type: String, maxlength: 120, required: true },
    filter_expr: { type: String, maxlength: 4000 },
    size_estimate: { type: Number, min: 0, default: 0 },
    status_code: { type: String, enum: ['draft', 'ready', 'archived', 'deleted'], default: 'draft' },
    status_date: { type: Date },
    deleted_at: { type: Date }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
//# sourceMappingURL=campaigns-audiences.schema.js.map