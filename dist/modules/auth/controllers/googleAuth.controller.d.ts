import { Request, Response } from 'express';
import { GoogleAuthService } from '../services/googleAuth.service';
export declare class GoogleAuthController {
    private readonly googleAuthService;
    private readonly logger;
    constructor(googleAuthService: GoogleAuthService);
    googleCallback(req: Request, res: Response): Promise<{
        url: string;
    }>;
    getGoogleAuthUrl(): Promise<{
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
    googleSuccess(): Promise<{
        success: boolean;
        message: string;
    }>;
    googleFailure(): Promise<{
        success: boolean;
        message: string;
    }>;
}
