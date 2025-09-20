import { ProfileService } from '../services/profile.service';
import { JwtUser } from '../strategies/jwt.strategy';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(user: JwtUser): Promise<{
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
    editProfile(user: JwtUser, body: {
        name: string;
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
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
    changePassword(user: JwtUser, body: {
        oldPassword: string;
        newPassword: string;
        confirmPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            user: (import("mongoose").Document<unknown, {}, import("../models/user.model").User, {}, {}> & import("../models/user.model").User & Required<{
                _id: unknown;
            }> & {
                __v: number;
            }) | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: string;
        data?: undefined;
    }>;
}
