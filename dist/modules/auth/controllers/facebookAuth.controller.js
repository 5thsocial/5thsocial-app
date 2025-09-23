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
const passport_1 = require("@nestjs/passport");
const throttler_1 = require("@nestjs/throttler");
const facebookAuth_service_1 = require("../services/facebookAuth.service");
let FacebookAuthController = FacebookAuthController_1 = class FacebookAuthController {
    facebookAuthService;
    logger = new common_1.Logger(FacebookAuthController_1.name);
    constructor(facebookAuthService) {
        this.facebookAuthService = facebookAuthService;
    }
    async facebookAuth() {
    }
    async facebookCallback(req, res) {
        try {
            if (!req.user) {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const html = this.createErrorPage(frontendUrl, 'Facebook authentication failed - no user data received');
                return res.send(html);
            }
            const result = await this.facebookAuthService.handleFacebookAuth(req.user);
            if (result.success && result.data) {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const { user, token } = result.data;
                const html = this.createSuccessPage(frontendUrl, {
                    token,
                    user,
                    message: result.message || 'Facebook authentication successful'
                });
                return res.send(html);
            }
            else {
                const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
                const html = this.createErrorPage(frontendUrl, 'Facebook authentication failed');
                return res.send(html);
            }
        }
        catch (error) {
            this.logger.error('Facebook callback error', error);
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            const html = this.createErrorPage(frontendUrl, 'Internal server error during Facebook authentication');
            return res.send(html);
        }
    }
    createSuccessPage(frontendUrl, data) {
        const { token, user, message } = data;
        const userJson = JSON.stringify(user).replace(/"/g, '&quot;');
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facebook Authentication</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .success { color: #28a745; }
          .loading { margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="loading">
          <div>Processing Facebook authentication...</div>
          <div style="margin-top: 20px;">
            <div style="width: 20px; height: 20px; border: 2px solid #1877f2; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
          </div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <script>
          try {
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_AUTH_SUCCESS',
                data: {
                  token: '${token}',
                  user: JSON.parse('${userJson}'),
                  message: '${message}'
                }
              }, '${frontendUrl}');
              window.close();
            } else {
              localStorage.setItem('authToken', '${token}');
              localStorage.setItem('user', '${userJson}');
              window.location.href = '${frontendUrl}';
            }
          } catch (error) {
            console.error('Authentication processing error:', error);
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_AUTH_ERROR',
                error: 'Failed to process authentication'
              }, '${frontendUrl}');
              window.close();
            } else {
              window.location.href = '${frontendUrl}?error=auth_processing_failed';
            }
          }
        </script>
      </body>
      </html>
    `;
    }
    createErrorPage(frontendUrl, errorMessage) {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facebook Authentication Error</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .error { color: #dc3545; }
        </style>
      </head>
      <body>
        <div class="error">
          <h2>Authentication Error</h2>
          <p>${errorMessage}</p>
          <p>Redirecting...</p>
        </div>
        <script>
          if (window.opener) {
            window.opener.postMessage({
              type: 'FACEBOOK_AUTH_ERROR',
              error: '${errorMessage}'
            }, '${frontendUrl}');
            window.close();
          } else {
            setTimeout(() => {
              window.location.href = '${frontendUrl}?error=' + encodeURIComponent('${errorMessage}');
            }, 2000);
          }
        </script>
      </body>
      </html>
    `;
    }
};
exports.FacebookAuthController = FacebookAuthController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('facebook')),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacebookAuthController.prototype, "facebookAuth", null);
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('facebook')),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FacebookAuthController.prototype, "facebookCallback", null);
exports.FacebookAuthController = FacebookAuthController = FacebookAuthController_1 = __decorate([
    (0, common_1.Controller)('auth/facebook'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    __metadata("design:paramtypes", [facebookAuth_service_1.FacebookAuthService])
], FacebookAuthController);
//# sourceMappingURL=facebookAuth.controller.js.map