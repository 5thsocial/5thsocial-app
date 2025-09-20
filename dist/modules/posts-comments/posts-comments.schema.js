"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsCommentsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PostsCommentsSchema = new mongoose_1.Schema({
    posts_comments_id: { type: String, required: true, unique: true, index: true },
    parent_id: { type: String, required: true, index: true },
    usr_user_id: { type: String, required: true, index: true },
    prf_profile_id: { type: String, required: true, index: true },
    body: { type: String, required: true, maxlength: 5000 },
    status_code: { type: String, enum: ['visible', 'hidden', 'deleted'], default: 'visible' },
    status_date: { type: Date },
    deleted_at: { type: Date }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
//# sourceMappingURL=posts-comments.schema.js.map