import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
export declare class LoginService {
    private userModel;
    private jwtService;
    private readonly logger;
    constructor(userModel: Model<User>, jwtService: JwtService);
    loginUser(email: string, password: string): Promise<{
        token: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            roles: string[];
        };
    }>;
}
