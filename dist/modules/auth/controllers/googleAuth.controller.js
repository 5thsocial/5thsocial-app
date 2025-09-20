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
var GoogleAuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const googleAuth_service_1 = require("../services/googleAuth.service");
let GoogleAuthController = GoogleAuthController_1 = class GoogleAuthController {
    googleAuthService;
    logger = new common_1.Logger(GoogleAuthController_1.name);
    constructor(googleAuthService) {
        this.googleAuthService = googleAuthService;
    }
    async googleCallback(req, res) {
        try {
            if (!req.user) {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const errorUrl = `${frontendUrl}/google-success.html?error=${encodeURIComponent('Google authentication failed - no user data received')}`;
                return { url: errorUrl };
            }
            const result = await this.googleAuthService.handleGoogleAuth(req.user);
            if (result.success && result.data) {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const { user, token } = result.data;
                const successUrl = `${frontendUrl}/google-success.html?` +
                    `token=${encodeURIComponent(token)}&` +
                    `user=${encodeURIComponent(JSON.stringify(user))}&` +
                    `message=${encodeURIComponent(result.message || 'Google authentication successful')}`;
                return { url: successUrl };
            }
            else {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const errorUrl = `${frontendUrl}/google-success.html?error=${encodeURIComponent('Authentication failed')}`;
                return { url: errorUrl };
            }
        }
        catch (error) {
            this.logger.error('Google callback error', error);
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const errorUrl = `${frontendUrl}/google-success.html?error=${encodeURIComponent('Internal server error during Google authentication')}`;
            return { url: errorUrl };
        }
    }
    async getGoogleAuthUrl() {
        try {
            const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
                `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
                `redirect_uri=${process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback'}&` +
                `response_type=code&` +
                `scope=profile email&` +
                `access_type=offline&` +
                `prompt=consent`;
            return {
                success: true,
                message: 'Google OAuth URL generated',
                data: {
                    authUrl: googleAuthUrl
                }
            };
        }
        catch (error) {
            this.logger.error('Google auth URL error', error);
            return {
                success: false,
                message: 'Error generating Google OAuth URL'
            };
        }
    }
    async googleSuccess() {
        try {
            return {
                success: true,
                message: 'Google authentication successful. Please use the callback endpoint for API integration.'
            };
        }
        catch (error) {
            this.logger.error('Google success error', error);
            return {
                success: false,
                message: 'Internal server error'
            };
        }
    }
    async googleFailure() {
        try {
            return {
                success: false,
                message: 'Google authentication failed'
            };
        }
        catch (error) {
            this.logger.error('Google failure error', error);
            return {
                success: false,
                message: 'Internal server error'
            };
        }
    }
};
exports.GoogleAuthController = GoogleAuthController;
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.Redirect)(),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Get)('auth-url'),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "getGoogleAuthUrl", null);
__decorate([
    (0, common_1.Get)('success'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleSuccess", null);
__decorate([
    (0, common_1.Get)('failure'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleFailure", null);
exports.GoogleAuthController = GoogleAuthController = GoogleAuthController_1 = __decorate([
    (0, common_1.Controller)('auth/google'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    __metadata("design:paramtypes", [googleAuth_service_1.GoogleAuthService])
], GoogleAuthController);
//# sourceMappingURL=googleAuth.controller.js.map