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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var HealthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("@nestjs/config");
let HealthService = HealthService_1 = class HealthService {
    connection;
    configService;
    logger = new common_1.Logger(HealthService_1.name);
    redis;
    constructor(connection, configService) {
        this.connection = connection;
        this.configService = configService;
        this.initRedis();
    }
    initRedis() {
        try {
            const redisUrl = this.configService.get('REDIS_URL');
            if (redisUrl) {
                this.redis = new ioredis_1.default(redisUrl);
            }
            else {
                this.redis = new ioredis_1.default({
                    host: this.configService.get('REDIS_HOST') || 'localhost',
                    port: Number(this.configService.get('REDIS_PORT')) || 6379,
                    username: this.configService.get('REDIS_USERNAME'),
                    password: this.configService.get('REDIS_PASSWORD'),
                    tls: this.configService.get('REDIS_TLS') === 'true' ? {} : undefined,
                });
            }
        }
        catch (error) {
            this.logger.warn('Redis not configured for health checks');
        }
    }
    async checkMongo() {
        try {
            return this.connection.readyState === 1;
        }
        catch (error) {
            this.logger.error('MongoDB health check failed', error);
            return false;
        }
    }
    async checkRedis() {
        if (!this.redis)
            return false;
        try {
            const result = await this.redis.ping();
            return result === 'PONG';
        }
        catch (error) {
            this.logger.error('Redis health check failed', error);
            return false;
        }
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = HealthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        config_1.ConfigService])
], HealthService);
//# sourceMappingURL=health.service.js.map