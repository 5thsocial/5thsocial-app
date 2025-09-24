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
exports.NavService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nav_manifest_schema_1 = require("./nav-manifest.schema");
let NavService = class NavService {
    model;
    constructor(model) {
        this.model = model;
    }
    async latest() {
        const doc = await this.model
            .findOne({}, {}, { sort: { updatedAt: -1 } })
            .lean();
        if (!doc) {
            console.log('No document found, creating seed data...');
            const seed = {
                version: "1.0.0",
                data: {
                    apps: [
                        {
                            key: "Friends",
                            label: "Friends",
                            disabled: false,
                            components: [
                                {
                                    key: "create",
                                    label: "Create",
                                    view: "Create",
                                    icon: "📝",
                                    type: "component",
                                    workflows: [
                                        {
                                            key: "create_post",
                                            label: "Create Post",
                                            view: "CreatePost",
                                            type: "workflow",
                                            icon: "📄"
                                        },
                                        {
                                            key: "create_campaign",
                                            label: "Create Campaign",
                                            view: "CreateCampaign",
                                            type: "workflow",
                                            icon: "📢"
                                        },
                                        {
                                            key: "create_mission",
                                            label: "Create Mission",
                                            view: "CreateMission",
                                            type: "workflow",
                                            icon: "🎯"
                                        },
                                    ],
                                },
                                {
                                    key: "feed",
                                    label: "Feed",
                                    view: "Feed",
                                    icon: "📰",
                                    type: "component"
                                },
                                {
                                    key: "campaigns",
                                    label: "Campaigns",
                                    view: "Campaigns",
                                    icon: "📢",
                                    type: "component",
                                },
                                {
                                    key: "missions",
                                    label: "Missions",
                                    view: "Missions",
                                    icon: "🎯",
                                    type: "component",
                                },
                                {
                                    key: "profile",
                                    label: "Profile",
                                    view: "Profile",
                                    icon: "👤",
                                    type: "component",
                                },
                            ],
                        },
                        {
                            key: "Feed",
                            label: "Feed",
                            disabled: false,
                            components: [
                                {
                                    key: "home",
                                    label: "Home",
                                    view: "Home",
                                    icon: "🏠",
                                    type: "component"
                                },
                                {
                                    key: "trending",
                                    label: "Trending",
                                    view: "Trending",
                                    icon: "🔥",
                                    type: "component"
                                },
                                {
                                    key: "following",
                                    label: "Following",
                                    view: "Following",
                                    icon: "👥",
                                    type: "component"
                                },
                            ],
                        },
                        {
                            key: "Posts",
                            label: "Posts",
                            disabled: false,
                            components: [
                                {
                                    key: "create",
                                    label: "Create",
                                    view: "Create",
                                    icon: "✏️",
                                    type: "component"
                                },
                                {
                                    key: "drafts",
                                    label: "Drafts",
                                    view: "Drafts",
                                    icon: "📝",
                                    type: "component"
                                },
                                {
                                    key: "published",
                                    label: "Published",
                                    view: "Published",
                                    icon: "📤",
                                    type: "component"
                                },
                            ],
                        },
                        {
                            key: "Connections",
                            label: "Connections",
                            disabled: true,
                            components: [],
                        },
                        {
                            key: "Followers",
                            label: "Followers",
                            disabled: true,
                            components: [],
                        },
                    ],
                },
            };
            console.log('Creating seed with data:', JSON.stringify(seed, null, 2));
            try {
                const created = await this.model.create(seed);
                console.log('Seed data created successfully:', created);
                const verification = await this.model.findById(created._id).lean();
                console.log('Verification - what was actually saved:', JSON.stringify(verification, null, 2));
                return seed.data;
            }
            catch (error) {
                console.error('Error creating seed data:', error);
                throw error;
            }
        }
        console.log('Found existing document:', JSON.stringify(doc, null, 2));
        return doc.data;
    }
    async upsert(token, body) {
        const admin = process.env.ADMIN_TOKEN || "changeme";
        if (!token || token !== admin)
            throw new common_1.UnauthorizedException("invalid token");
        const { version, data } = body || {};
        if (!version || !data)
            throw new Error("version and data required");
        console.log('Upserting data:', JSON.stringify({ version, data }, null, 2));
        await this.model.updateOne({ version }, { $set: { data } }, { upsert: true });
        return { ok: true };
    }
    async state() {
        return { counts: { activeCampaigns: 0, missions: 0 } };
    }
};
exports.NavService = NavService;
exports.NavService = NavService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(nav_manifest_schema_1.NavManifest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NavService);
//# sourceMappingURL=nav.service.js.map