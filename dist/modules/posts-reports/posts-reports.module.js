"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsReportsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_reports_controller_js_1 = require("./posts-reports.controller.js");
const posts_reports_service_js_1 = require("./posts-reports.service.js");
const posts_reports_schema_js_1 = require("./posts-reports.schema.js");
let PostsReportsModule = class PostsReportsModule {
};
exports.PostsReportsModule = PostsReportsModule;
exports.PostsReportsModule = PostsReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'PostsReports', schema: posts_reports_schema_js_1.PostsReportsSchema, collection: 'posts-reports' }])],
        controllers: [posts_reports_controller_js_1.PostsReportsController],
        providers: [posts_reports_service_js_1.PostsReportsService],
    })
], PostsReportsModule);
//# sourceMappingURL=posts-reports.module.js.map