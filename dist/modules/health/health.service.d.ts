import { Connection } from 'mongoose';
import { ConfigService } from '@nestjs/config';
export declare class HealthService {
    private connection;
    private configService;
    private readonly logger;
    private redis?;
    constructor(connection: Connection, configService: ConfigService);
    private initRedis;
    checkMongo(): Promise<boolean>;
    checkRedis(): Promise<boolean>;
}
