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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
let PostsService = class PostsService {
    model;
    constructor(model) {
        this.model = model;
    }
    create(dto) { return this.model.create({ ...dto, status_date: new Date() }); }
    findAll() { return this.model.find().limit(200).lean(); }
    findOne(id) { return this.model.findOne({ post_id: id }).lean(); }
    update(id, dto) { return this.model.findOneAndUpdate({ post_id: id }, { ...dto, status_date: new Date() }, { new: true }); }
    remove(id) { return this.model.findOneAndUpdate({ post_id: id }, { status_code: 'deleted', deleted_at: new Date(), status_date: new Date() }, { new: true }); }
    async publish(id) {
        const post = await this.model.findOne({ pst_post_id: id });
        if (!post)
            return null;
        if (post.status_code !== 'draft' && post.status_code !== 'queued') {
            throw new Error('Only draft/queued can be published');
        }
        post.status_code = 'published';
        post.pst_published_at = new Date();
        post.status_date = new Date();
        await post.save();
        return post.toObject();
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Post')),
    __metadata("design:paramtypes", [Function])
], PostsService);
//# sourceMappingURL=posts.service.js.map