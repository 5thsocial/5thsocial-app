import { Request, Response } from 'express';
import { FacebookAuthService } from '../services/facebookAuth.service';
export declare class FacebookAuthController {
    private readonly facebookAuthService;
    private readonly logger;
    constructor(facebookAuthService: FacebookAuthService);
    facebookAuth(): Promise<void>;
    facebookCallback(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private createSuccessPage;
    private createErrorPage;
}
