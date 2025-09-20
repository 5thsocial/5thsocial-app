import { LoginService } from '../services/login.service';
import { LoginDto } from '../dto/login.dto';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(body: LoginDto): Promise<{
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
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
}
