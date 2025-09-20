"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsAssignmentsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MissionsAssignmentsSchema = new mongoose_1.Schema({
    missions_assignments_id: { type: String, required: true, unique: true, index: true },
    parent_id: { type: String, required: true, index: true },
    assignee_prf_profile_id: { type: String, required: true, index: true },
    due_at: { type: Date },
    status_code: { type: String, enum: ['assigned', 'in_progress', 'completed', 'canceled', 'deleted'], default: 'assigned' },
    status_date: { type: Date },
    deleted_at: { type: Date }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
//# sourceMappingURL=missions-assignments.schema.js.map