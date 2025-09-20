import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { OTP } from '../models/otp.model';
import { ConfigService } from '@nestjs/config';
export declare class ForgetPasswordService {
    private userModel;
    private otpModel;
    private configService;
    private readonly logger;
    private transporter;
    constructor(userModel: Model<User>, otpModel: Model<OTP>, configService: ConfigService);
    generateOTP(): string;
    hashOTP(otp: string): Promise<string>;
    compareOTP(plainOtp: string, hashedOtp: string): Promise<boolean>;
    checkUserExists(email: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    sendOTPEmail(email: string, otp: string): Promise<any>;
    handleForgetPassword(email: string): Promise<{
        success: boolean;
        message: string;
        email: string;
    }>;
    verifyOTP(email: string, otp: string): Promise<{
        success: boolean;
        message: string;
        email: string;
    }>;
    resetPassword(email: string, newPassword: string): Promise<{
        success: boolean;
        message: string;
        email: string;
    }>;
}
