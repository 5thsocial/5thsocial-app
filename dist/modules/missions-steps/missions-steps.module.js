"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsStepsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const missions_steps_controller_js_1 = require("./missions-steps.controller.js");
const missions_steps_service_js_1 = require("./missions-steps.service.js");
const missions_steps_schema_js_1 = require("./missions-steps.schema.js");
let MissionsStepsModule = class MissionsStepsModule {
};
exports.MissionsStepsModule = MissionsStepsModule;
exports.MissionsStepsModule = MissionsStepsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'MissionsSteps', schema: missions_steps_schema_js_1.MissionsStepsSchema, collection: 'missions-steps' }])],
        controllers: [missions_steps_controller_js_1.MissionsStepsController],
        providers: [missions_steps_service_js_1.MissionsStepsService],
    })
], MissionsStepsModule);
//# sourceMappingURL=missions-steps.module.js.map