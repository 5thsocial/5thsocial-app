import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { BullModule } from "@nestjs/bullmq";
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./modules/auth/auth.module";
import { QueueModule } from "./modules/scheduler/queue.module";
import { ProfilesModule } from "./modules/profiles/profiles.module";
import { PostsModule } from "./modules/posts/posts.module";
import { CampaignsModule } from "./modules/campaigns/campaigns.module";
import { MissionsModule } from "./modules/missions/missions.module";
import { WorkersModule } from "./workers/workers.module";
import { PostsCommentsModule } from "./modules/posts-comments/posts-comments.module";
import { PostsReactionsModule } from "./modules/posts-reactions/posts-reactions.module";
import { PostsBookmarksModule } from "./modules/posts-bookmarks/posts-bookmarks.module";
import { PostsSharesModule } from "./modules/posts-shares/posts-shares.module";
import { PostsReportsModule } from "./modules/posts-reports/posts-reports.module";
import { PostsViewsModule } from "./modules/posts-views/posts-views.module";
import { PostsMetricsModule } from "./modules/posts-metrics/posts-metrics.module";
import { MissionsStepsModule } from "./modules/missions-steps/missions-steps.module";
import { MissionsAssignmentsModule } from "./modules/missions-assignments/missions-assignments.module";
import { MissionsCompletionsModule } from "./modules/missions-completions/missions-completions.module";
import { CampaignsAudiencesModule } from "./modules/campaigns-audiences/campaigns-audiences.module";
import { CampaignsJobsModule } from "./modules/campaigns-jobs/campaigns-jobs.module";
import { CampaignsMetricsModule } from "./modules/campaigns-metrics/campaigns-metrics.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        // Fail fast in production if critical env vars are missing
        if (config.NODE_ENV === "production") {
          const required = ["MONGODB_URI", "JWT_SECRET", "REDIS_URL"];
          for (const key of required) {
            if (!config[key]) {
              throw new Error(
                `Required environment variable ${key} is missing`
              );
            }
          }
        }
        return config;
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const uri = cfg.get<string>("MONGODB_URI");
        if (!uri) {
          throw new Error("MONGODB_URI environment variable is required");
        }
        return {
          uri,
          dbName: cfg.get<string>("MONGODB_DB") || "5thsocial",
          maxPoolSize: 50,
          serverSelectionTimeoutMS: 5000,
          connectTimeoutMS: 5000,
          retryWrites: true,
        };
      },
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const redisUrl = cfg.get<string>("REDIS_URL");

        if (redisUrl) {
          try {
            const url = new URL(redisUrl);

            // Check if it's an Upstash URL (requires TLS)
            const isUpstash = url.hostname.includes("upstash.io");

            return {
              connection: {
                host: url.hostname,
                port: parseInt(url.port) || 6379,
                username: url.username || "default",
                password: url.password,
                tls: isUpstash ? {} : undefined, // Enable TLS for Upstash
                retryDelayOnFailover: 100,
                maxRetriesPerRequest: null,
                lazyConnect: true,
              },
            };
          } catch (error) {
            console.error("Failed to parse REDIS_URL:", error);
            // Fallback to basic config if URL parsing fails
          }
        }

        // Fallback to individual Redis config
        return {
          connection: {
            host: cfg.get<string>("REDIS_HOST") || "localhost",
            port: Number(cfg.get<string>("REDIS_PORT")) || 6379,
            username: cfg.get<string>("REDIS_USERNAME"),
            password: cfg.get<string>("REDIS_PASSWORD"),
            tls: cfg.get<string>("REDIS_TLS") === "true" ? {} : undefined,
          },
        };
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute per IP
      },
    ]),
    HealthModule,
    AuthModule,
    QueueModule,
    ProfilesModule,
    PostsModule,
    CampaignsModule,
    MissionsModule,
    WorkersModule,
    PostsCommentsModule,
    PostsReactionsModule,
    PostsBookmarksModule,
    PostsSharesModule,
    PostsReportsModule,
    PostsViewsModule,
    PostsMetricsModule,
    MissionsStepsModule,
    MissionsAssignmentsModule,
    MissionsCompletionsModule,
    CampaignsAudiencesModule,
    CampaignsJobsModule,
    CampaignsMetricsModule,
  ],
})
export class AppModule {}
