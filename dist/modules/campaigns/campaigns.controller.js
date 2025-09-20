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
exports.CampaignsController = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const swagger_1 = require("@nestjs/swagger");
const zod_pipe_js_1 = require("../../common/zod.pipe.js");
const campaigns_service_js_1 = require("./campaigns.service.js");
const campaign_dto_js_1 = require("./campaign.dto.js");
const jwt_auth_guard_js_1 = require("../auth/jwt-auth.guard.js");
const user_decorator_js_1 = require("../auth/user.decorator.js");
const queue_tokens_js_1 = require("../scheduler/queue.tokens.js");
const uuid_pipe_js_1 = require("../../common/uuid.pipe.js");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
let CampaignsController = class CampaignsController {
    svc;
    q;
    constructor(svc, q) {
        this.svc = svc;
        this.q = q;
    }
    create(user, body) {
        return this.svc.create({ ...body, usr_user_id: user.sub });
    }
    findAll(user) {
        return this.svc.findAll(user);
    }
    async findOne(user, id) {
        const campaign = await this.svc.findOne(id, user);
        if (!campaign)
            throw new common_1.NotFoundException();
        return campaign;
    }
    async update(user, id, body) {
        const campaign = await this.svc.update(id, body, user);
        if (!campaign)
            throw new common_1.NotFoundException();
        return campaign;
    }
    async remove(user, id) {
        const campaign = await this.svc.remove(id, user);
        if (!campaign)
            throw new common_1.NotFoundException();
        return campaign;
    }
    async schedule(user, id) {
        const campaign = await this.svc.schedule(id, user);
        if (!campaign)
            throw new common_1.NotFoundException();
        this.q.add('dispatch', { id, scheduled: true });
        return campaign;
    }
    async activate(user, id) {
        const campaign = await this.svc.activate(id, user);
        if (!campaign)
            throw new common_1.NotFoundException();
        this.q.add('dispatch', { id });
        return campaign;
    }
    async pause(user, id) {
        const campaign = await this.svc.pause(id, user);
        if (!campaign)
            throw new common_1.NotFoundException();
        this.q.add('pause', { id });
        return campaign;
    }
    async finalize(user, id) {
        const campaign = await this.svc.finalize(id, user);
        if (!campaign)
            throw new common_1.NotFoundException();
        this.q.add('finalize', { id });
        return campaign;
    }
};
exports.CampaignsController = CampaignsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    (0, swagger_1.ApiBody)({ schema: { example: {
                "cmp_campaign_id": "UUID",
                "cmp_name": "Launch A",
                "cmp_objective": "awareness",
                "cmp_channel": ["inapp"]
            } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created' }),
    (0, common_1.UsePipes)(new zod_pipe_js_1.ZodValidationPipe(campaign_dto_js_1.CampaignCreateDto)),
    __param(0, (0, user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    __param(0, (0, user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    __param(0, (0, user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', new uuid_pipe_js_1.UUIDValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    (0, common_1.UsePipes)(new zod_pipe_js_1.ZodValidationPipe(campaign_dto_js_1.CampaignUpdateDto)),
    __param(0, (0, user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', new uuid_pipe_js_1.UUIDValidationPipe())),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    __param(0, (0, user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', new uuid_pipe_js_1.UUIDValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/schedule'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    __param(0, (0, user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', new uuid_pipe_js_1.UUIDValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "schedule", null);
__decorate([
    (0, common_1.Post)(':id/activate'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    __param(0, (0, user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', new uuid_pipe_js_1.UUIDValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "activate", null);
__decorate([
    (0, common_1.Post)(':id/pause'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    __param(0, (0, user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', new uuid_pipe_js_1.UUIDValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "pause", null);
__decorate([
    (0, common_1.Post)(':id/finalize'),
    (0, roles_decorator_js_1.Roles)('user', 'admin'),
    __param(0, (0, user_decorator_js_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', new uuid_pipe_js_1.UUIDValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CampaignsController.prototype, "finalize", null);
exports.CampaignsController = CampaignsController = __decorate([
    (0, swagger_1.ApiTags)('campaigns'),
    (0, common_1.Controller)('campaigns'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard, roles_guard_js_1.RolesGuard),
    __param(1, (0, bullmq_1.InjectQueue)(queue_tokens_js_1.QUEUE_CAMPAIGNS)),
    __metadata("design:paramtypes", [campaigns_service_js_1.CampaignsService,
        bullmq_2.Queue])
], CampaignsController);
//# sourceMappingURL=campaigns.controller.js.map