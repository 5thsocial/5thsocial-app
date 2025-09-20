"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = void 0;
const zod_1 = require("zod");
exports.ResetPasswordDto = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format').toLowerCase(),
    newPassword: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: zod_1.z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
//# sourceMappingURL=reset-password.dto.js.map