"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsAudiencesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const campaigns_audiences_controller_js_1 = require("./campaigns-audiences.controller.js");
const campaigns_audiences_service_js_1 = require("./campaigns-audiences.service.js");
const campaigns_audiences_schema_js_1 = require("./campaigns-audiences.schema.js");
let CampaignsAudiencesModule = class CampaignsAudiencesModule {
};
exports.CampaignsAudiencesModule = CampaignsAudiencesModule;
exports.CampaignsAudiencesModule = CampaignsAudiencesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'CampaignsAudiences', schema: campaigns_audiences_schema_js_1.CampaignsAudiencesSchema, collection: 'campaigns-audiences' }])],
        controllers: [campaigns_audiences_controller_js_1.CampaignsAudiencesController],
        providers: [campaigns_audiences_service_js_1.CampaignsAudiencesService],
    })
], CampaignsAudiencesModule);
//# sourceMappingURL=campaigns-audiences.module.js.map