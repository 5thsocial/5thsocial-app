"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignWorker = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
let CampaignWorker = class CampaignWorker extends bullmq_1.WorkerHost {
    async process(job) {
        switch (job.name) {
            case 'dispatch':
                await this.handleDispatch(job);
                break;
            case 'pause':
                await this.handlePause(job);
                break;
            case 'resume':
                await this.handleResume(job);
                break;
            case 'finalize':
                await this.handleFinalize(job);
                break;
            default:
                console.warn(`Unknown job type: ${job.name}`);
        }
    }
    async handleDispatch(job) {
        console.log('[campaigns.dispatch]', job.data);
    }
    async handlePause(job) {
        console.log('[campaigns.pause]', job.data);
    }
    async handleResume(job) {
        console.log('[campaigns.resume]', job.data);
    }
    async handleFinalize(job) {
        console.log('[campaigns.finalize]', job.data);
    }
};
exports.CampaignWorker = CampaignWorker;
exports.CampaignWorker = CampaignWorker = __decorate([
    (0, common_1.Injectable)(),
    (0, bullmq_1.Processor)('campaigns')
], CampaignWorker);
//# sourceMappingURL=campaign.worker.js.map