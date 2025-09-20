"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsMetricsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_metrics_controller_js_1 = require("./posts-metrics.controller.js");
const posts_metrics_service_js_1 = require("./posts-metrics.service.js");
const posts_metrics_schema_js_1 = require("./posts-metrics.schema.js");
let PostsMetricsModule = class PostsMetricsModule {
};
exports.PostsMetricsModule = PostsMetricsModule;
exports.PostsMetricsModule = PostsMetricsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'PostsMetrics', schema: posts_metrics_schema_js_1.PostsMetricsSchema, collection: 'posts-metrics' }])],
        controllers: [posts_metrics_controller_js_1.PostsMetricsController],
        providers: [posts_metrics_service_js_1.PostsMetricsService],
    })
], PostsMetricsModule);
//# sourceMappingURL=posts-metrics.module.js.map