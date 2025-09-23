import { Request, Response } from 'express';
import { GoogleAuthService } from '../services/googleAuth.service';
export declare class GoogleAuthController {
    private readonly googleAuthService;
    private readonly logger;
    constructor(googleAuthService: GoogleAuthService);
    googleAuth(): Promise<void>;
    googleCallback(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private createSuccessPage;
    private createErrorPage;
}
