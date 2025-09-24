"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const nav_manifest_schema_1 = require("./nav-manifest.schema");
const nav_controller_1 = require("./nav.controller");
const nav_service_1 = require("./nav.service");
let NavModule = class NavModule {
};
exports.NavModule = NavModule;
exports.NavModule = NavModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: nav_manifest_schema_1.NavManifest.name, schema: nav_manifest_schema_1.NavManifestSchema }])],
        controllers: [nav_controller_1.NavController],
        providers: [nav_service_1.NavService],
        exports: []
    })
], NavModule);
//# sourceMappingURL=nav.module.js.map