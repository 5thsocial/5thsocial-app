"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsReportsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PostsReportsSchema = new mongoose_1.Schema({
    posts_reports_id: { type: String, required: true, unique: true, index: true },
    parent_id: { type: String, required: true, index: true },
    usr_user_id: { type: String, required: true, index: true },
    reason: { type: String, maxlength: 2000 },
    status_code: { type: String, enum: ['open', 'reviewed', 'dismissed', 'deleted'], default: 'open' },
    status_date: { type: Date },
    deleted_at: { type: Date }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
//# sourceMappingURL=posts-reports.schema.js.map