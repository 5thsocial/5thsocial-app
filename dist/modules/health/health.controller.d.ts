import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    readinessCheck(): Promise<{
        status: string;
        mongoOk: boolean;
        redisOk: boolean;
        timestamp: string;
    }>;
}
