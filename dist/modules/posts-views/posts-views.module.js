"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsViewsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_views_controller_js_1 = require("./posts-views.controller.js");
const posts_views_service_js_1 = require("./posts-views.service.js");
const posts_views_schema_js_1 = require("./posts-views.schema.js");
let PostsViewsModule = class PostsViewsModule {
};
exports.PostsViewsModule = PostsViewsModule;
exports.PostsViewsModule = PostsViewsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'PostsViews', schema: posts_views_schema_js_1.PostsViewsSchema, collection: 'posts-views' }])],
        controllers: [posts_views_controller_js_1.PostsViewsController],
        providers: [posts_views_service_js_1.PostsViewsService],
    })
], PostsViewsModule);
//# sourceMappingURL=posts-views.module.js.map