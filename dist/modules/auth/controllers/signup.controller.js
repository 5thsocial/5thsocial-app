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
exports.SignupController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const signup_service_1 = require("../services/signup.service");
const signup_dto_1 = require("../dto/signup.dto");
const zod_validation_pipe_1 = require("../../../common/pipes/zod-validation.pipe");
let SignupController = class SignupController {
    signupService;
    constructor(signupService) {
        this.signupService = signupService;
    }
    async createUser(body) {
        try {
            const { token, user } = await this.signupService.createUser(body);
            return {
                success: true,
                message: "Account created successfully. You are now logged in.",
                data: { token, user }
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage.includes('already exists')) {
                return {
                    success: false,
                    message: 'An account with this email already exists. Please sign in.',
                    error: errorMessage
                };
            }
            return {
                success: false,
                message: "Error creating account",
                error: errorMessage
            };
        }
    }
};
exports.SignupController = SignupController;
__decorate([
    (0, common_1.Post)(),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    __param(0, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(signup_dto_1.SignupDto))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SignupController.prototype, "createUser", null);
exports.SignupController = SignupController = __decorate([
    (0, common_1.Controller)('auth/signup'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    __metadata("design:paramtypes", [signup_service_1.SignupService])
], SignupController);
//# sourceMappingURL=signup.controller.js.map