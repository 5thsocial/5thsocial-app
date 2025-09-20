import { ProfilesService } from './profiles.service.js';
import { JwtUser } from '../auth/strategies/jwt.strategy.js';
export declare class ProfilesController {
    private readonly svc;
    constructor(svc: ProfilesService);
    create(user: JwtUser, body: any): Promise<{
        success: boolean;
        message: string;
        data: import("./interfaces/profile.interface.js").IProfile;
    }>;
    findAll(user: JwtUser): Promise<{
        success: boolean;
        message: string;
        data: import("./interfaces/profile.interface.js").IProfile[];
    }>;
    findOne(user: JwtUser, id: string): Promise<{
        success: boolean;
        message: string;
        data: import("./interfaces/profile.interface.js").IProfile;
    }>;
    update(user: JwtUser, id: string, body: any): Promise<{
        success: boolean;
        message: string;
        data: import("./interfaces/profile.interface.js").IProfile;
    }>;
    remove(user: JwtUser, id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    findByUserId(userId: string): Promise<{
        success: boolean;
        message: string;
        data: import("./interfaces/profile.interface.js").IProfile[];
    }>;
}
