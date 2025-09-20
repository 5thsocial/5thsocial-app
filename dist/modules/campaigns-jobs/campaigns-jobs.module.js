"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsJobsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const campaigns_jobs_controller_js_1 = require("./campaigns-jobs.controller.js");
const campaigns_jobs_service_js_1 = require("./campaigns-jobs.service.js");
const campaigns_jobs_schema_js_1 = require("./campaigns-jobs.schema.js");
let CampaignsJobsModule = class CampaignsJobsModule {
};
exports.CampaignsJobsModule = CampaignsJobsModule;
exports.CampaignsJobsModule = CampaignsJobsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'CampaignsJobs', schema: campaigns_jobs_schema_js_1.CampaignsJobsSchema, collection: 'campaigns-jobs' }])],
        controllers: [campaigns_jobs_controller_js_1.CampaignsJobsController],
        providers: [campaigns_jobs_service_js_1.CampaignsJobsService],
    })
], CampaignsJobsModule);
//# sourceMappingURL=campaigns-jobs.module.js.map