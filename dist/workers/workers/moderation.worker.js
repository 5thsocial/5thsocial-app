"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationWorker = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
let ModerationWorker = class ModerationWorker extends bullmq_1.WorkerHost {
    async process(job) {
        switch (job.name) {
            case 'profile-review':
                await this.handleProfileReview(job);
                break;
            case 'post-review':
                await this.handlePostReview(job);
                break;
            default:
                console.warn(`Unknown job type: ${job.name}`);
        }
    }
    async handleProfileReview(job) {
        console.log('[moderation.profile-review]', job.data);
    }
    async handlePostReview(job) {
        console.log('[moderation.post-review]', job.data);
    }
};
exports.ModerationWorker = ModerationWorker;
exports.ModerationWorker = ModerationWorker = __decorate([
    (0, common_1.Injectable)(),
    (0, bullmq_1.Processor)('moderation')
], ModerationWorker);
//# sourceMappingURL=moderation.worker.js.map