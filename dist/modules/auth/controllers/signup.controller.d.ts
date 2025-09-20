import { SignupService } from '../services/signup.service';
import { SignupDto } from '../dto/signup.dto';
export declare class SignupController {
    private readonly signupService;
    constructor(signupService: SignupService);
    createUser(body: SignupDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: import("mongoose").Document<unknown, {}, import("../models/user.model").User, {}, {}> & import("../models/user.model").User & Required<{
                _id: unknown;
            }> & {
                __v: number;
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
