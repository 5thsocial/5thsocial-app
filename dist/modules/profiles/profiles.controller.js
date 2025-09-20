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
exports.ProfilesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const zod_pipe_js_1 = require("../../common/zod.pipe.js");
const profiles_service_js_1 = require("./profiles.service.js");
const profile_dto_js_1 = require("./profile.dto.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
const current_user_decorator_js_1 = require("../auth/decorators/current-user.decorator.js");
let ProfilesController = class ProfilesController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    async create(user, body) {
        try {
            if (!user.roles.includes('admin') && body.usr_user_id !== user.sub) {
                throw new common_1.HttpException('You can only create profiles for yourself', common_1.HttpStatus.FORBIDDEN);
            }
            if (!user.roles.includes('admin')) {
                body.usr_user_id = user.sub;
            }
            const result = await this.svc.create(body);
            return {
                success: true,
                message: 'Profile created successfully',
                data: result
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage.includes('duplicate') || errorMessage.includes('handle')) {
                throw new common_1.HttpException('Profile handle already exists', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException('Error creating profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(user) {
        try {
            let profiles;
            if (user.roles.includes('admin')) {
                profiles = await this.svc.findAll();
            }
            else {
                profiles = await this.svc.findByUserId(user.sub);
            }
            return {
                success: true,
                message: 'Profiles retrieved successfully',
                data: profiles
            };
        }
        catch (error) {
            throw new common_1.HttpException('Error retrieving profiles', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(user, id) {
        try {
            const profile = await this.svc.findOne(id);
            if (!profile) {
                throw new common_1.HttpException('Profile not found', common_1.HttpStatus.NOT_FOUND);
            }
            const profileData = profile;
            if (!user.roles.includes('admin') && profileData.usr_user_id !== user.sub) {
                throw new common_1.HttpException('Access denied', common_1.HttpStatus.FORBIDDEN);
            }
            return {
                success: true,
                message: 'Profile retrieved successfully',
                data: profile
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error retrieving profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(user, id, body) {
        try {
            const existingProfile = await this.svc.findOne(id);
            if (!existingProfile) {
                throw new common_1.HttpException('Profile not found', common_1.HttpStatus.NOT_FOUND);
            }
            const profileData = existingProfile;
            if (!user.roles.includes('admin') && profileData.usr_user_id !== user.sub) {
                throw new common_1.HttpException('Access denied', common_1.HttpStatus.FORBIDDEN);
            }
            const updatedProfile = await this.svc.update(id, body);
            if (!updatedProfile) {
                throw new common_1.HttpException('Profile not found', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: 'Profile updated successfully',
                data: updatedProfile
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            if (errorMessage.includes('duplicate') || errorMessage.includes('handle')) {
                throw new common_1.HttpException('Profile handle already exists', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException('Error updating profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(user, id) {
        try {
            const existingProfile = await this.svc.findOne(id);
            if (!existingProfile) {
                throw new common_1.HttpException('Profile not found', common_1.HttpStatus.NOT_FOUND);
            }
            const profileData = existingProfile;
            if (!user.roles.includes('admin') && profileData.usr_user_id !== user.sub) {
                throw new common_1.HttpException('Access denied', common_1.HttpStatus.FORBIDDEN);
            }
            const result = await this.svc.remove(id);
            if (!result) {
                throw new common_1.HttpException('Profile not found', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                success: true,
                message: 'Profile deleted successfully'
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error deleting profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByUserId(userId) {
        try {
            const profiles = await this.svc.findByUserId(userId);
            return {
                success: true,
                message: 'User profiles retrieved successfully',
                data: profiles
            };
        }
        catch (error) {
            throw new common_1.HttpException('Error retrieving user profiles', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProfilesController = ProfilesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 60000 } }),
    (0, swagger_1.ApiBody)({ schema: { example: {
                "prf_profile_id": "UUID",
                "usr_user_id": "UUID",
                "prf_handle": "grego",
                "prf_display_name": "Greg O",
                "status_code": "active"
            } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Profile created successfully' }),
    (0, common_1.UsePipes)(new zod_pipe_js_1.ZodValidationPipe(profile_dto_js_1.ProfileCreateDto)),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profiles retrieved successfully' }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile retrieved successfully' }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.UsePipes)(new zod_pipe_js_1.ZodValidationPipe(profile_dto_js_1.ProfileUpdateDto)),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated successfully' }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    (0, throttler_1.Throttle)({ default: { limit: 3, ttl: 300000 } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile deleted successfully' }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User profiles retrieved successfully' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "findByUserId", null);
exports.ProfilesController = ProfilesController = __decorate([
    (0, swagger_1.ApiTags)('profiles'),
    (0, common_1.Controller)('profiles'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard, throttler_1.ThrottlerGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [profiles_service_js_1.ProfilesService])
], ProfilesController);
//# sourceMappingURL=profiles.controller.js.map