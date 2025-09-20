import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<{
        success: boolean;
        message: string;
        data: {
            users: (import("mongoose").Document<unknown, {}, import("../models/user.model").User, {}, {}> & import("../models/user.model").User & Required<{
                _id: unknown;
            }> & {
                __v: number;
            })[];
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
}
