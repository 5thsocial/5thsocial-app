import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
export declare class SignupService {
    private userModel;
    private jwtService;
    private readonly logger;
    constructor(userModel: Model<User>, jwtService: JwtService);
    createUser(userData: any): Promise<{
        token: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            roles: string[];
        };
    }>;
}
