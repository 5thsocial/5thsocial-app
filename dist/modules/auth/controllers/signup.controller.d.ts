import { SignupService } from '../services/signup.service';
import { SignupDto } from '../dto/signup.dto';
export declare class SignupController {
    private readonly signupService;
    constructor(signupService: SignupService);
    createUser(body: SignupDto): Promise<{
        success: boolean;
        message: string;
        data: {
            token: string;
            user: {
                id: unknown;
                name: string;
                email: string;
                roles: string[];
            };
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
}
