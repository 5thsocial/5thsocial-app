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
exports.CampaignsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const scheduler_service_js_1 = require("../scheduler/scheduler.service.js");
let CampaignsService = class CampaignsService {
    model;
    sched;
    constructor(model, sched) {
        this.model = model;
        this.sched = sched;
    }
    async checkOwnership(id, user) {
        const campaign = await this.model.findOne({ cmp_campaign_id: id }).lean();
        if (!campaign)
            throw new common_1.NotFoundException();
        const userRoles = user.roles || [];
        if (!userRoles.includes('admin') && campaign.usr_user_id !== user.sub) {
            throw new common_1.ForbiddenException();
        }
        return campaign;
    }
    async create(dto) {
        const c = await this.model.create({ ...dto, status_date: new Date() });
        await this.sched.scheduleCampaign(dto.cmp_campaign_id, dto.cmp_start_at, dto.cmp_end_at);
        return c.toObject();
    }
    async findAll(user) {
        const userRoles = user.roles || [];
        const filter = userRoles.includes('admin')
            ? {}
            : { usr_user_id: user.sub };
        return this.model.find(filter).limit(200).lean();
    }
    async findOne(id, user) {
        const userRoles = user.roles || [];
        const filter = userRoles.includes('admin')
            ? { cmp_campaign_id: id }
            : { cmp_campaign_id: id, usr_user_id: user.sub };
        return this.model.findOne(filter).lean();
    }
    async update(id, dto, user) {
        await this.checkOwnership(id, user);
        const u = await this.model.findOneAndUpdate({ cmp_campaign_id: id }, { ...dto, status_date: new Date() }, { new: true }).lean();
        if (u) {
            const campaign = u;
            await this.sched.scheduleCampaign(id, campaign.cmp_start_at, campaign.cmp_end_at);
        }
        return u;
    }
    async remove(id, user) {
        await this.checkOwnership(id, user);
        return this.model.findOneAndUpdate({ cmp_campaign_id: id }, { status_code: 'deleted', deleted_at: new Date(), status_date: new Date() }, { new: true }).lean();
    }
    async schedule(id, user) {
        await this.checkOwnership(id, user);
        const c = await this.model.findOne({ cmp_campaign_id: id });
        if (!c)
            return null;
        if (c.status_code !== 'draft' && c.status_code !== 'paused') {
            throw new Error('Invalid state');
        }
        c.status_code = 'scheduled';
        c.status_date = new Date();
        await c.save();
        await this.sched.scheduleCampaign(id, c.cmp_start_at, c.cmp_end_at);
        return c.toObject();
    }
    async activate(id, user) {
        await this.checkOwnership(id, user);
        const c = await this.model.findOne({ cmp_campaign_id: id });
        if (!c)
            return null;
        if (c.status_code !== 'scheduled')
            throw new Error('Invalid state');
        c.status_code = 'active';
        c.status_date = new Date();
        await c.save();
        return c.toObject();
    }
    async pause(id, user) {
        await this.checkOwnership(id, user);
        const c = await this.model.findOne({ cmp_campaign_id: id });
        if (!c)
            return null;
        if (c.status_code !== 'active')
            throw new Error('Invalid state');
        c.status_code = 'paused';
        c.status_date = new Date();
        await c.save();
        return c.toObject();
    }
    async finalize(id, user) {
        await this.checkOwnership(id, user);
        const c = await this.model.findOne({ cmp_campaign_id: id });
        if (!c)
            return null;
        if (c.status_code !== 'active' && c.status_code !== 'paused') {
            throw new Error('Invalid state');
        }
        c.status_code = 'completed';
        c.status_date = new Date();
        await c.save();
        return c.toObject();
    }
};
exports.CampaignsService = CampaignsService;
exports.CampaignsService = CampaignsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Campaign')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        scheduler_service_js_1.CampaignsScheduler])
], CampaignsService);
//# sourceMappingURL=campaigns.service.js.map