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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const profile_service_1 = require("../services/profile.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
let ProfileController = class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfile(user) {
        try {
            const profile = await this.profileService.getProfile(user.sub);
            return {
                success: true,
                message: "Profile fetched successfully",
                data: { user: profile },
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            return {
                success: false,
                message: "Error fetching profile",
                error: errorMessage,
            };
        }
    }
    async editProfile(user, body) {
        try {
            const { name, email } = body;
            if (!name || !email) {
                return {
                    success: false,
                    message: "Name and email are required",
                };
            }
            const updatedUser = await this.profileService.editProfile(user.sub, {
                name,
                email,
            });
            return {
                success: true,
                message: "Profile updated successfully",
                data: { user: updatedUser },
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage === "Email already exists") {
                return {
                    success: false,
                    message: "Email already exists",
                    error: errorMessage,
                };
            }
            return {
                success: false,
                message: "Error updating profile",
                error: errorMessage,
            };
        }
    }
    async changePassword(user, body) {
        try {
            const { oldPassword, newPassword, confirmPassword } = body;
            if (!oldPassword || !newPassword || !confirmPassword) {
                return {
                    success: false,
                    message: "Old password, new password, and confirm password are required",
                };
            }
            if (newPassword.length < 6) {
                return {
                    success: false,
                    message: "New password must be at least 6 characters long",
                };
            }
            const updatedUser = await this.profileService.changePassword(user.sub, oldPassword, newPassword, confirmPassword);
            return {
                success: true,
                message: "Password changed successfully",
                data: { user: updatedUser },
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage === "Old password is incorrect") {
                return {
                    success: false,
                    message: "Old password is incorrect",
                    error: errorMessage,
                };
            }
            if (errorMessage === "New password and confirm password do not match") {
                return {
                    success: false,
                    message: "New password and confirm password do not match",
                    error: errorMessage,
                };
            }
            if (errorMessage === "New password must be different from old password") {
                return {
                    success: false,
                    message: "New password must be different from old password",
                    error: errorMessage,
                };
            }
            return {
                success: false,
                message: "Error changing password",
                error: errorMessage,
            };
        }
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)(),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "editProfile", null);
__decorate([
    (0, common_1.Put)('change-password'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "changePassword", null);
exports.ProfileController = ProfileController = __decorate([
    (0, common_1.Controller)('auth/profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, throttler_1.ThrottlerGuard),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map