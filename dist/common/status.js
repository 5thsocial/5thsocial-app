"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = now;
exports.markDeleted = markDeleted;
function now() { return new Date(); }
function markDeleted(doc) {
    doc.status_code = 'deleted';
    doc.deleted_at = new Date();
    doc.status_date = new Date();
    return doc;
}
//# sourceMappingURL=status.js.map