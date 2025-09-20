"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileDto = void 0;
const zod_1 = require("zod");
exports.EditProfileDto = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    email: zod_1.z.string().email('Invalid email format').toLowerCase(),
});
//# sourceMappingURL=edit-profile.dto.js.map