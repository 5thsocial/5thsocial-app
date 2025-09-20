"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsCommentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_comments_controller_js_1 = require("./posts-comments.controller.js");
const posts_comments_service_js_1 = require("./posts-comments.service.js");
const posts_comments_schema_js_1 = require("./posts-comments.schema.js");
let PostsCommentsModule = class PostsCommentsModule {
};
exports.PostsCommentsModule = PostsCommentsModule;
exports.PostsCommentsModule = PostsCommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'PostsComments', schema: posts_comments_schema_js_1.PostsCommentsSchema, collection: 'posts-comments' }])],
        controllers: [posts_comments_controller_js_1.PostsCommentsController],
        providers: [posts_comments_service_js_1.PostsCommentsService],
    })
], PostsCommentsModule);
//# sourceMappingURL=posts-comments.module.js.map