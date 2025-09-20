"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = void 0;
const zod_1 = require("zod");
exports.LoginDto = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format').toLowerCase(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
//# sourceMappingURL=login.dto.js.map