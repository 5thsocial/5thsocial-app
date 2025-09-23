"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const bullmq_1 = require("@nestjs/bullmq");
const throttler_1 = require("@nestjs/throttler");
const auth_module_1 = require("./modules/auth/auth.module");
const queue_module_1 = require("./modules/scheduler/queue.module");
const profiles_module_1 = require("./modules/profiles/profiles.module");
const posts_module_1 = require("./modules/posts/posts.module");
const campaigns_module_1 = require("./modules/campaigns/campaigns.module");
const missions_module_1 = require("./modules/missions/missions.module");
const workers_module_1 = require("./workers/workers.module");
const posts_comments_module_1 = require("./modules/posts-comments/posts-comments.module");
const posts_reactions_module_1 = require("./modules/posts-reactions/posts-reactions.module");
const posts_bookmarks_module_1 = require("./modules/posts-bookmarks/posts-bookmarks.module");
const posts_shares_module_1 = require("./modules/posts-shares/posts-shares.module");
const posts_reports_module_1 = require("./modules/posts-reports/posts-reports.module");
const posts_views_module_1 = require("./modules/posts-views/posts-views.module");
const posts_metrics_module_1 = require("./modules/posts-metrics/posts-metrics.module");
const missions_steps_module_1 = require("./modules/missions-steps/missions-steps.module");
const missions_assignments_module_1 = require("./modules/missions-assignments/missions-assignments.module");
const missions_completions_module_1 = require("./modules/missions-completions/missions-completions.module");
const campaigns_audiences_module_1 = require("./modules/campaigns-audiences/campaigns-audiences.module");
const campaigns_jobs_module_1 = require("./modules/campaigns-jobs/campaigns-jobs.module");
const campaigns_metrics_module_1 = require("./modules/campaigns-metrics/campaigns-metrics.module");
const health_module_1 = require("./modules/health/health.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: (config) => {
                    if (config.NODE_ENV === "production") {
                        const required = ["MONGODB_URI", "JWT_SECRET", "REDIS_URL"];
                        for (const key of required) {
                            if (!config[key]) {
                                throw new Error(`Required environment variable ${key} is missing`);
                            }
                        }
                    }
                    return config;
                },
            }),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (cfg) => {
                    const uri = cfg.get("MONGODB_URI");
                    if (!uri) {
                        throw new Error("MONGODB_URI environment variable is required");
                    }
                    return {
                        uri,
                        dbName: cfg.get("MONGODB_DB") || "5thsocial",
                        maxPoolSize: 50,
                        serverSelectionTimeoutMS: 5000,
                        connectTimeoutMS: 5000,
                        retryWrites: true,
                    };
                },
            }),
            bullmq_1.BullModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (cfg) => {
                    const redisUrl = cfg.get("REDIS_URL");
                    if (redisUrl) {
                        try {
                            const url = new URL(redisUrl);
                            const isUpstash = url.hostname.includes("upstash.io");
                            return {
                                connection: {
                                    host: url.hostname,
                                    port: parseInt(url.port) || 6379,
                                    username: url.username || "default",
                                    password: url.password,
                                    tls: isUpstash ? {} : undefined,
                                    retryDelayOnFailover: 100,
                                    maxRetriesPerRequest: null,
                                    lazyConnect: true,
                                },
                            };
                        }
                        catch (error) {
                            console.error("Failed to parse REDIS_URL:", error);
                        }
                    }
                    return {
                        connection: {
                            host: cfg.get("REDIS_HOST") || "localhost",
                            port: Number(cfg.get("REDIS_PORT")) || 6379,
                            username: cfg.get("REDIS_USERNAME"),
                            password: cfg.get("REDIS_PASSWORD"),
                            tls: cfg.get("REDIS_TLS") === "true" ? {} : undefined,
                        },
                    };
                },
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            queue_module_1.QueueModule,
            profiles_module_1.ProfilesModule,
            posts_module_1.PostsModule,
            campaigns_module_1.CampaignsModule,
            missions_module_1.MissionsModule,
            workers_module_1.WorkersModule,
            posts_comments_module_1.PostsCommentsModule,
            posts_reactions_module_1.PostsReactionsModule,
            posts_bookmarks_module_1.PostsBookmarksModule,
            posts_shares_module_1.PostsSharesModule,
            posts_reports_module_1.PostsReportsModule,
            posts_views_module_1.PostsViewsModule,
            posts_metrics_module_1.PostsMetricsModule,
            missions_steps_module_1.MissionsStepsModule,
            missions_assignments_module_1.MissionsAssignmentsModule,
            missions_completions_module_1.MissionsCompletionsModule,
            campaigns_audiences_module_1.CampaignsAudiencesModule,
            campaigns_jobs_module_1.CampaignsJobsModule,
            campaigns_metrics_module_1.CampaignsMetricsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map