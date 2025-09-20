import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('ready')
  async readinessCheck() {
    const mongoOk = await this.healthService.checkMongo();
    const redisOk = await this.healthService.checkRedis();
    
    const status = mongoOk && redisOk ? 'ok' : 'error';
    
    return {
      status,
      mongoOk,
      redisOk,
      timestamp: new Date().toISOString(),
    };
  }
}