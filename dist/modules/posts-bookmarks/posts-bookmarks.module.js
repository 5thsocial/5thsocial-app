"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsBookmarksModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_bookmarks_controller_js_1 = require("./posts-bookmarks.controller.js");
const posts_bookmarks_service_js_1 = require("./posts-bookmarks.service.js");
const posts_bookmarks_schema_js_1 = require("./posts-bookmarks.schema.js");
let PostsBookmarksModule = class PostsBookmarksModule {
};
exports.PostsBookmarksModule = PostsBookmarksModule;
exports.PostsBookmarksModule = PostsBookmarksModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'PostsBookmarks', schema: posts_bookmarks_schema_js_1.PostsBookmarksSchema, collection: 'posts-bookmarks' }])],
        controllers: [posts_bookmarks_controller_js_1.PostsBookmarksController],
        providers: [posts_bookmarks_service_js_1.PostsBookmarksService],
    })
], PostsBookmarksModule);
//# sourceMappingURL=posts-bookmarks.module.js.map