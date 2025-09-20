"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsCompletionsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const missions_completions_controller_js_1 = require("./missions-completions.controller.js");
const missions_completions_service_js_1 = require("./missions-completions.service.js");
const missions_completions_schema_js_1 = require("./missions-completions.schema.js");
let MissionsCompletionsModule = class MissionsCompletionsModule {
};
exports.MissionsCompletionsModule = MissionsCompletionsModule;
exports.MissionsCompletionsModule = MissionsCompletionsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'MissionsCompletions', schema: missions_completions_schema_js_1.MissionsCompletionsSchema, collection: 'missions-completions' }])],
        controllers: [missions_completions_controller_js_1.MissionsCompletionsController],
        providers: [missions_completions_service_js_1.MissionsCompletionsService],
    })
], MissionsCompletionsModule);
//# sourceMappingURL=missions-completions.module.js.map