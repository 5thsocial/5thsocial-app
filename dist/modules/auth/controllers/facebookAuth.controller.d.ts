import { Request, Response } from 'express';
import { FacebookAuthService } from '../services/facebookAuth.service';
export declare class FacebookAuthController {
    private readonly facebookAuthService;
    private readonly logger;
    constructor(facebookAuthService: FacebookAuthService);
    facebookCallback(req: Request, res: Response): Promise<{
        url: string;
    }>;
    getFacebookAuthUrl(): Promise<{
        success: boolean;
        message: string;
        data: {
            authUrl: string;
        };
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    facebookSuccess(): Promise<{
        success: boolean;
        message: string;
    }>;
    facebookFailure(): Promise<{
        success: boolean;
        message: string;
    }>;
}
