"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsMetricsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const campaigns_metrics_controller_js_1 = require("./campaigns-metrics.controller.js");
const campaigns_metrics_service_js_1 = require("./campaigns-metrics.service.js");
const campaigns_metrics_schema_js_1 = require("./campaigns-metrics.schema.js");
let CampaignsMetricsModule = class CampaignsMetricsModule {
};
exports.CampaignsMetricsModule = CampaignsMetricsModule;
exports.CampaignsMetricsModule = CampaignsMetricsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'CampaignsMetrics', schema: campaigns_metrics_schema_js_1.CampaignsMetricsSchema, collection: 'campaigns-metrics' }])],
        controllers: [campaigns_metrics_controller_js_1.CampaignsMetricsController],
        providers: [campaigns_metrics_service_js_1.CampaignsMetricsService],
    })
], CampaignsMetricsModule);
//# sourceMappingURL=campaigns-metrics.module.js.map