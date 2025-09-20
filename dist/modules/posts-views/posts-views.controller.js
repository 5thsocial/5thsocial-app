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
exports.PostsViewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const zod_pipe_js_1 = require("../../common/zod.pipe.js");
const posts_views_service_js_1 = require("./posts-views.service.js");
const posts_views_dto_js_1 = require("./posts-views.dto.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const roles_guard_js_1 = require("../auth/guards/roles.guard.js");
const roles_decorator_js_1 = require("../auth/decorators/roles.decorator.js");
let PostsViewsController = class PostsViewsController {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    list(parentId) { return this.svc.list(parentId); }
    create(parentId, body) { return this.svc.create(body); }
    update(parentId, id, body) { return this.svc.update(id, parentId, body); }
    remove(parentId, id) { return this.svc.remove(id, parentId); }
};
exports.PostsViewsController = PostsViewsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List items' }),
    __param(0, (0, common_1.Param)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsViewsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    (0, common_1.UsePipes)(new zod_pipe_js_1.ZodValidationPipe(posts_views_dto_js_1.PostsViewsCreateDto)),
    (0, swagger_1.ApiBody)({ schema: { example: {
                "posts_views_id": "UUID",
                "parent_id": "POST_UUID",
                "usr_user_id": "UUID",
                "session_id": "abc"
            } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created' }),
    __param(0, (0, common_1.Param)('parentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsViewsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, common_1.UsePipes)(new zod_pipe_js_1.ZodValidationPipe(posts_views_dto_js_1.PostsViewsUpdateDto)),
    (0, swagger_1.ApiBody)({ schema: { example: {
                "posts_views_id": "UUID",
                "parent_id": "POST_UUID",
                "usr_user_id": "UUID",
                "session_id": "abc"
            } } }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Updated' }),
    __param(0, (0, common_1.Param)('parentId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PostsViewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)('admin'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Soft-deleted' }),
    __param(0, (0, common_1.Param)('parentId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PostsViewsController.prototype, "remove", null);
exports.PostsViewsController = PostsViewsController = __decorate([
    (0, swagger_1.ApiTags)('posts-views'),
    (0, common_1.Controller)('posts/:parentId/views'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    __metadata("design:paramtypes", [posts_views_service_js_1.PostsViewsService])
], PostsViewsController);
//# sourceMappingURL=posts-views.controller.js.map