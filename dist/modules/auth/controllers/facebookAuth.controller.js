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
var FacebookAuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookAuthController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const facebookAuth_service_1 = require("../services/facebookAuth.service");
let FacebookAuthController = FacebookAuthController_1 = class FacebookAuthController {
    facebookAuthService;
    logger = new common_1.Logger(FacebookAuthController_1.name);
    constructor(facebookAuthService) {
        this.facebookAuthService = facebookAuthService;
    }
    async facebookCallback(req, res) {
        try {
            if (!req.user) {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const errorUrl = `${frontendUrl}/facebook-success.html?error=${encodeURIComponent('Facebook authentication failed - no user data received')}`;
                return { url: errorUrl };
            }
            const result = await this.facebookAuthService.handleFacebookAuth(req.user);
            if (result.success && result.data) {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const { user, token } = result.data;
                const successUrl = `${frontendUrl}/facebook-success.html?` +
                    `token=${encodeURIComponent(token)}&` +
                    `user=${encodeURIComponent(JSON.stringify(user))}&` +
                    `message=${encodeURIComponent(result.message || 'Facebook authentication successful')}`;
                return { url: successUrl };
            }
            else {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const errorUrl = `${frontendUrl}/facebook-success.html?error=${encodeURIComponent('Authentication failed')}`;
                return { url: errorUrl };
            }
        }
        catch (error) {
            this.logger.error('Facebook callback error', error);
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const errorUrl = `${frontendUrl}/facebook-success.html?error=${encodeURIComponent('Internal server error during Facebook authentication')}`;
            return { url: errorUrl };
        }
    }
    async getFacebookAuthUrl() {
        try {
            const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
                `client_id=${process.env.FACEBOOK_APP_ID}&` +
                `redirect_uri=${process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/api/auth/facebook/callback'}&` +
                `response_type=code&` +
                `scope=email,public_profile`;
            return {
                success: true,
                message: 'Facebook OAuth URL generated',
                data: {
                    authUrl: facebookAuthUrl
                }
            };
        }
        catch (error) {
            this.logger.error('Facebook auth URL error', error);
            return {
                success: false,
                message: 'Error generating Facebook OAuth URL'
            };
        }
    }
    async facebookSuccess() {
        try {
            return {
                success: true,
                message: 'Facebook authentication successful. Please use the callback endpoint for API integration.'
            };
        }
        catch (error) {
            this.logger.error('Facebook success error', error);
            return {
                success: false,
                message: 'Internal server error'
            };
        }
    }
    async facebookFailure() {
        try {
            return {
                success: false,
                message: 'Facebook authentication failed'
            };
        }
        catch (error) {
            this.logger.error('Facebook failure error', error);
            return {
                success: false,
                message: 'Internal server error'
            };
        }
    }
};
exports.FacebookAuthController = FacebookAuthController;
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.Redirect)(),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FacebookAuthController.prototype, "facebookCallback", null);
__decorate([
    (0, common_1.Get)('auth-url'),
    (0, throttler_1.Throttle)({ default: { limit: 20, ttl: 60000 } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacebookAuthController.prototype, "getFacebookAuthUrl", null);
__decorate([
    (0, common_1.Get)('success'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacebookAuthController.prototype, "facebookSuccess", null);
__decorate([
    (0, common_1.Get)('failure'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacebookAuthController.prototype, "facebookFailure", null);
exports.FacebookAuthController = FacebookAuthController = FacebookAuthController_1 = __decorate([
    (0, common_1.Controller)('auth/facebook'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    __metadata("design:paramtypes", [facebookAuth_service_1.FacebookAuthService])
], FacebookAuthController);
//# sourceMappingURL=facebookAuth.controller.js.map