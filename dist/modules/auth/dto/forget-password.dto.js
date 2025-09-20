"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = exports.VerifyOtpDto = exports.ForgetPasswordDto = void 0;
const zod_1 = require("zod");
exports.ForgetPasswordDto = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format').toLowerCase(),
});
exports.VerifyOtpDto = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format').toLowerCase(),
    otp: zod_1.z.string().regex(/^\d{6}$/, 'OTP must be a 6-digit number'),
});
exports.ResetPasswordDto = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format').toLowerCase(),
    newPassword: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: zod_1.z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
//# sourceMappingURL=forget-password.dto.js.map