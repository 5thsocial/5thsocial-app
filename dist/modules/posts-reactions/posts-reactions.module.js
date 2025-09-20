"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsReactionsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_reactions_controller_js_1 = require("./posts-reactions.controller.js");
const posts_reactions_service_js_1 = require("./posts-reactions.service.js");
const posts_reactions_schema_js_1 = require("./posts-reactions.schema.js");
let PostsReactionsModule = class PostsReactionsModule {
};
exports.PostsReactionsModule = PostsReactionsModule;
exports.PostsReactionsModule = PostsReactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'PostsReactions', schema: posts_reactions_schema_js_1.PostsReactionsSchema, collection: 'posts-reactions' }])],
        controllers: [posts_reactions_controller_js_1.PostsReactionsController],
        providers: [posts_reactions_service_js_1.PostsReactionsService],
    })
], PostsReactionsModule);
//# sourceMappingURL=posts-reactions.module.js.map