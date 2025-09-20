import { ForgetPasswordService } from '../services/forgetPassword.service';
import { ForgetPasswordDto, VerifyOtpDto, ResetPasswordDto } from '../dto/forget-password.dto';
export declare class ForgetPasswordController {
    private readonly forgetPasswordService;
    constructor(forgetPasswordService: ForgetPasswordService);
    sendOTPEmail(body: ForgetPasswordDto): Promise<{
        success: boolean;
        message: string;
        data: {
            email: string;
        };
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    verifyOTP(body: VerifyOtpDto): Promise<{
        success: boolean;
        message: string;
        data: {
            email: string;
        };
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
        data: {
            email: string;
        };
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
}
