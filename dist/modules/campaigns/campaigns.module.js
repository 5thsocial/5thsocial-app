"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const campaigns_service_js_1 = require("./campaigns.service.js");
const campaigns_controller_js_1 = require("./campaigns.controller.js");
const campaign_schema_js_1 = require("./campaign.schema.js");
const queue_module_js_1 = require("../scheduler/queue.module.js");
let CampaignsModule = class CampaignsModule {
};
exports.CampaignsModule = CampaignsModule;
exports.CampaignsModule = CampaignsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Campaign', schema: campaign_schema_js_1.CampaignSchema, collection: 'campaigns' }]), queue_module_js_1.QueueModule],
        controllers: [campaigns_controller_js_1.CampaignsController],
        providers: [campaigns_service_js_1.CampaignsService],
        exports: [mongoose_1.MongooseModule, campaigns_service_js_1.CampaignsService]
    })
], CampaignsModule);
//# sourceMappingURL=campaigns.module.js.map