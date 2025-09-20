"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ForgetPasswordService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const nodemailer = __importStar(require("nodemailer"));
const bcrypt = __importStar(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const otp_model_1 = require("../models/otp.model");
const config_1 = require("@nestjs/config");
let ForgetPasswordService = ForgetPasswordService_1 = class ForgetPasswordService {
    userModel;
    otpModel;
    configService;
    logger = new common_1.Logger(ForgetPasswordService_1.name);
    transporter;
    constructor(userModel, otpModel, configService) {
        this.userModel = userModel;
        this.otpModel = otpModel;
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            secure: this.configService.get('SMTP_SECURE') === 'true',
            auth: {
                user: this.configService.get('SMTP_USER') || this.configService.get('EMAIL_USER'),
                pass: this.configService.get('SMTP_PASS') || this.configService.get('EMAIL_PASSWORD'),
            },
            tls: {
                rejectUnauthorized: true,
            },
        });
    }
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async hashOTP(otp) {
        const saltRounds = 12;
        return await bcrypt.hash(otp, saltRounds);
    }
    async compareOTP(plainOtp, hashedOtp) {
        return await bcrypt.compare(plainOtp, hashedOtp);
    }
    async checkUserExists(email) {
        try {
            const user = await this.userModel.findOne({ email: email.toLowerCase() });
            return user;
        }
        catch (error) {
            this.logger.error('Error checking user existence', error);
            throw new Error("Error checking user existence");
        }
    }
    async sendOTPEmail(email, otp) {
        try {
            const mailOptions = {
                from: this.configService.get('SMTP_USER') || this.configService.get('EMAIL_USER'),
                to: email,
                subject: "Password Reset OTP",
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
            </div>
            <p>This OTP is valid for 10 minutes. If you didn't request this password reset, please ignore this email.</p>
            <p>Best regards,<br>5thSocial Team</p>
          </div>
        `,
            };
            const result = await this.transporter.sendMail(mailOptions);
            return result;
        }
        catch (error) {
            this.logger.error('Error sending OTP email', error);
            throw new Error("Error sending email");
        }
    }
    async handleForgetPassword(email) {
        try {
            const user = await this.checkUserExists(email);
            if (!user) {
                throw new Error("No user found with this email address");
            }
            await this.otpModel.deleteMany({ email: email.toLowerCase() });
            const otp = this.generateOTP();
            const hashedOtp = await this.hashOTP(otp);
            await this.otpModel.create({
                email: email.toLowerCase(),
                otp: hashedOtp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
                isUsed: false,
            });
            await this.sendOTPEmail(email, otp);
            return {
                success: true,
                message: "OTP sent successfully to your email",
                email: email,
            };
        }
        catch (error) {
            this.logger.error('Forget password error', error);
            throw error;
        }
    }
    async verifyOTP(email, otp) {
        try {
            const otpRecords = await this.otpModel.find({
                email: email.toLowerCase(),
                isUsed: false,
                expiresAt: { $gt: new Date() }
            }).sort({ createdAt: -1 });
            if (!otpRecords.length) {
                throw new Error("Invalid or expired OTP");
            }
            let isValidOtp = false;
            let validRecord = null;
            for (const record of otpRecords) {
                const isMatch = await this.compareOTP(otp, record.otp);
                if (isMatch && !isValidOtp) {
                    isValidOtp = true;
                    validRecord = record;
                }
            }
            if (!isValidOtp || !validRecord) {
                throw new Error("Invalid or expired OTP");
            }
            await this.otpModel.updateMany({ email: email.toLowerCase() }, { isUsed: true });
            return {
                success: true,
                message: "OTP verified successfully",
                email: email
            };
        }
        catch (error) {
            this.logger.error('OTP verification error', error);
            throw error;
        }
    }
    async resetPassword(email, newPassword) {
        try {
            const user = await this.checkUserExists(email);
            if (!user) {
                throw new Error("No user found with this email address");
            }
            if (newPassword.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            await this.userModel.findByIdAndUpdate(user._id, {
                password: hashedPassword
            });
            await this.otpModel.deleteMany({ email: email.toLowerCase() });
            this.logger.log(`Password reset successful for email: ${email}`);
            return {
                success: true,
                message: "Password reset successfully",
                email: email
            };
        }
        catch (error) {
            this.logger.error('Password reset error', error);
            throw error;
        }
    }
};
exports.ForgetPasswordService = ForgetPasswordService;
exports.ForgetPasswordService = ForgetPasswordService = ForgetPasswordService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(otp_model_1.OTP.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], ForgetPasswordService);
//# sourceMappingURL=forgetPassword.service.js.map