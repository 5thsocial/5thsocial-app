import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private redis?: Redis;

  constructor(
    @InjectConnection() private connection: Connection,
    private configService: ConfigService,
  ) {
    this.initRedis();
  }

  private initRedis() {
    try {
      const redisUrl = this.configService.get<string>('REDIS_URL');
      if (redisUrl) {
        this.redis = new Redis(redisUrl);
      } else {
        this.redis = new Redis({
          host: this.configService.get<string>('REDIS_HOST') || 'localhost',
          port: Number(this.configService.get<string>('REDIS_PORT')) || 6379,
          username: this.configService.get<string>('REDIS_USERNAME'),
          password: this.configService.get<string>('REDIS_PASSWORD'),
          tls: this.configService.get<string>('REDIS_TLS') === 'true' ? {} : undefined,
        });
      }
    } catch (error) {
      this.logger.warn('Redis not configured for health checks');
    }
  }

  async checkMongo(): Promise<boolean> {
    try {
      return this.connection.readyState === 1;
    } catch (error) {
      this.logger.error('MongoDB health check failed', error);
      return false;
    }
  }

  async checkRedis(): Promise<boolean> {
    if (!this.redis) return false;
    
    try {
      const result = await this.redis.ping();
      return result === 'PONG';
    } catch (error) {
      this.logger.error('Redis health check failed', error);
      return false;
    }
  }
}