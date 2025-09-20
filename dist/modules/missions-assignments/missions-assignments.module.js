"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsAssignmentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const missions_assignments_controller_js_1 = require("./missions-assignments.controller.js");
const missions_assignments_service_js_1 = require("./missions-assignments.service.js");
const missions_assignments_schema_js_1 = require("./missions-assignments.schema.js");
let MissionsAssignmentsModule = class MissionsAssignmentsModule {
};
exports.MissionsAssignmentsModule = MissionsAssignmentsModule;
exports.MissionsAssignmentsModule = MissionsAssignmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'MissionsAssignments', schema: missions_assignments_schema_js_1.MissionsAssignmentsSchema, collection: 'missions-assignments' }])],
        controllers: [missions_assignments_controller_js_1.MissionsAssignmentsController],
        providers: [missions_assignments_service_js_1.MissionsAssignmentsService],
    })
], MissionsAssignmentsModule);
//# sourceMappingURL=missions-assignments.module.js.map