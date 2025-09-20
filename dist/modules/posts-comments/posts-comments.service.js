"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsCommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
let PostsCommentsService = class PostsCommentsService {
    model;
    constructor(model) {
        this.model = model;
    }
    list(parentId) { return this.model.find({ parent_id: parentId }).limit(200).lean(); }
    create(dto) { return this.model.create({ ...dto, status_date: new Date() }); }
    update(id, parentId, dto) {
        return this.model.findOneAndUpdate({ posts_comments_id: id, parent_id: parentId }, { ...dto, status_date: new Date() }, { new: true });
    }
    remove(id, parentId) {
        return this.model.findOneAndUpdate({ posts_comments_id: id, parent_id: parentId }, { status_code: 'deleted', deleted_at: new Date(), status_date: new Date() }, { new: true });
    }
};
exports.PostsCommentsService = PostsCommentsService;
exports.PostsCommentsService = PostsCommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('PostsComments')),
    __metadata("design:paramtypes", [Function])
], PostsCommentsService);
//# sourceMappingURL=posts-comments.service.js.map