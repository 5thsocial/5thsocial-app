"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const forgetPassword_service_1 = require("../services/forgetPassword.service");
const forget_password_dto_1 = require("../dto/forget-password.dto");
const zod_validation_pipe_1 = require("../../../common/pipes/zod-validation.pipe");
let ForgetPasswordController = class ForgetPasswordController {
    forgetPasswordService;
    constructor(forgetPasswordService) {
        this.forgetPasswordService = forgetPasswordService;
    }
    async sendOTPEmail(body) {
        try {
            const { email } = body;
            const result = await this.forgetPasswordService.handleForgetPassword(email);
            return {
                success: true,
                message: result.message,
                data: {
                    email: result.email,
                },
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage === "No user found with this email address") {
                return {
                    success: false,
                    message: "No user found with this email address",
                };
            }
            if (errorMessage === "Error sending email") {
                return {
                    success: false,
                    message: "Failed to send OTP email. Please try again later.",
                };
            }
            return {
                success: false,
                message: "Internal server error",
            };
        }
    }
    async verifyOTP(body) {
        try {
            const { email, otp } = body;
            const result = await this.forgetPasswordService.verifyOTP(email, otp);
            return {
                success: true,
                message: result.message,
                data: {
                    email: result.email,
                },
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage === "Invalid or expired OTP") {
                return {
                    success: false,
                    message: "Invalid or expired OTP. Please request a new one.",
                };
            }
            return {
                success: false,
                message: "Internal server error",
            };
        }
    }
    async resetPassword(body) {
        try {
            const { email, newPassword } = body;
            const result = await this.forgetPasswordService.resetPassword(email, newPassword);
            return {
                success: true,
                message: result.message,
                data: {
                    email: result.email,
                },
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage === "No user found with this email address") {
                return {
                    success: false,
                    message: "No user found with this email address",
                };
            }
            return {
                success: false,
                message: "Internal server error",
            };
        }
    }
};
exports.ForgetPasswordController = ForgetPasswordController;
__decorate([
    (0, common_1.Post)('send-mail'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(forget_password_dto_1.ForgetPasswordDto))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ForgetPasswordController.prototype, "sendOTPEmail", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(forget_password_dto_1.VerifyOtpDto))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ForgetPasswordController.prototype, "verifyOTP", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(forget_password_dto_1.ResetPasswordDto))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ForgetPasswordController.prototype, "resetPassword", null);
exports.ForgetPasswordController = ForgetPasswordController = __decorate([
    (0, common_1.Controller)('auth/forget-password'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    __metadata("design:paramtypes", [forgetPassword_service_1.ForgetPasswordService])
], ForgetPasswordController);
//# sourceMappingURL=forgetPassword.controller.js.map