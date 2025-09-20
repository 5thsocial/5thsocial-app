"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const missions_service_js_1 = require("./missions.service.js");
const missions_controller_js_1 = require("./missions.controller.js");
const mission_schema_js_1 = require("./mission.schema.js");
let MissionsModule = class MissionsModule {
};
exports.MissionsModule = MissionsModule;
exports.MissionsModule = MissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Mission', schema: mission_schema_js_1.MissionSchema, collection: 'missions' }])],
        controllers: [missions_controller_js_1.MissionsController],
        providers: [missions_service_js_1.MissionsService],
        exports: [mongoose_1.MongooseModule, missions_service_js_1.MissionsService]
    })
], MissionsModule);
//# sourceMappingURL=missions.module.js.map