import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
export declare class GoogleAuthService {
    private userModel;
    private jwtService;
    private readonly logger;
    constructor(userModel: Model<User>, jwtService: JwtService);
    generateToken(user: any): string;
    findOrCreateUser(profile: any): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                id: unknown;
                name: string;
                email: string;
                roles: string[];
            };
            token: string;
        };
    }>;
    handleGoogleAuth(profile: any): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                id: unknown;
                name: string;
                email: string;
                roles: string[];
            };
            token: string;
        };
    }>;
}
