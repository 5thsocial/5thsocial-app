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
exports.CampaignsScheduler = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const queue_tokens_js_1 = require("./queue.tokens.js");
let CampaignsScheduler = class CampaignsScheduler {
    queue;
    constructor(queue) {
        this.queue = queue;
    }
    async scheduleCampaign(id, startAt, endAt) {
        const now = new Date();
        if (startAt && startAt > now) {
            const delay = startAt.getTime() - now.getTime();
            await this.queue.add('dispatch', { id, scheduled: true }, { delay, jobId: `dispatch:${id}` });
        }
        if (endAt && endAt > now) {
            const delay = endAt.getTime() - now.getTime();
            await this.queue.add('pause', { id }, { delay, jobId: `pause:${id}` });
        }
    }
};
exports.CampaignsScheduler = CampaignsScheduler;
exports.CampaignsScheduler = CampaignsScheduler = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)(queue_tokens_js_1.QUEUE_CAMPAIGNS)),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], CampaignsScheduler);
//# sourceMappingURL=scheduler.service.js.map