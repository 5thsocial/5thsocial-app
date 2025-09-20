"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupDto = void 0;
const zod_1 = require("zod");
exports.SignupDto = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    email: zod_1.z.string().email('Invalid email format').toLowerCase(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
//# sourceMappingURL=signup.dto.js.map