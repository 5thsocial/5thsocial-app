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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProfilesService = class ProfilesService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(dto) {
        return this.model.create({
            ...dto,
            status_date: new Date()
        });
    }
    async findAll() {
        return this.model.find({ status_code: { $ne: 'deleted' } })
            .limit(200)
            .lean()
            .exec();
    }
    async findOne(id) {
        return this.model.findOne({
            prf_profile_id: id,
            status_code: { $ne: 'deleted' }
        })
            .lean()
            .exec();
    }
    async findByUserId(userId) {
        return this.model.find({
            usr_user_id: userId,
            status_code: { $ne: 'deleted' }
        })
            .lean()
            .exec();
    }
    async findByHandle(handle) {
        return this.model.findOne({
            prf_handle: handle,
            status_code: { $ne: 'deleted' }
        })
            .lean()
            .exec();
    }
    async update(id, dto) {
        return this.model.findOneAndUpdate({
            prf_profile_id: id,
            status_code: { $ne: 'deleted' }
        }, {
            ...dto,
            status_date: new Date()
        }, { new: true })
            .lean()
            .exec();
    }
    async remove(id) {
        return this.model.findOneAndUpdate({
            prf_profile_id: id,
            status_code: { $ne: 'deleted' }
        }, {
            status_code: 'deleted',
            deleted_at: new Date(),
            status_date: new Date()
        }, { new: true })
            .lean()
            .exec();
    }
    async isHandleAvailable(handle, excludeProfileId) {
        const query = {
            prf_handle: handle,
            status_code: { $ne: 'deleted' }
        };
        if (excludeProfileId) {
            query.prf_profile_id = { $ne: excludeProfileId };
        }
        const existing = await this.model.findOne(query).lean().exec();
        return !existing;
    }
    async getProfileStats() {
        const pipeline = [
            { $match: { status_code: { $ne: 'deleted' } } },
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    active: { $sum: { $cond: [{ $eq: ['$status_code', 'active'] }, 1, 0] } },
                    suspended: { $sum: { $cond: [{ $eq: ['$status_code', 'suspended'] }, 1, 0] } },
                    hidden: { $sum: { $cond: [{ $eq: ['$status_code', 'hidden'] }, 1, 0] } },
                    pendingModeration: { $sum: { $cond: [{ $eq: ['$prf_moderation_state', 'pending'] }, 1, 0] } },
                    flagged: { $sum: { $cond: [{ $eq: ['$prf_moderation_state', 'flagged'] }, 1, 0] } }
                }
            }
        ];
        const result = await this.model.aggregate(pipeline).exec();
        return result[0] || {
            total: 0,
            active: 0,
            suspended: 0,
            hidden: 0,
            pendingModeration: 0,
            flagged: 0
        };
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Profile')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map