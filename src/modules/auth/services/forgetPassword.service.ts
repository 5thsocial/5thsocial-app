import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { OTP } from '../models/otp.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ForgetPasswordService {
  private readonly logger = new Logger(ForgetPasswordService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(OTP.name) private otpModel: Model<OTP>,
    private configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      secure: this.configService.get('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get('SMTP_USER') || this.configService.get('EMAIL_USER'),
        pass: this.configService.get('SMTP_PASS') || this.configService.get('EMAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: true, // Enforce TLS certificate validation
      },
    });
  }

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async hashOTP(otp: string): Promise<string> {
    const saltRounds = 12; // Higher salt rounds for OTPs
    return await bcrypt.hash(otp, saltRounds);
  }

  async compareOTP(plainOtp: string, hashedOtp: string): Promise<boolean> {
    return await bcrypt.compare(plainOtp, hashedOtp);
  }

  async checkUserExists(email: string) {
    try {
      const user = await this.userModel.findOne({ email: email.toLowerCase() });
      return user;
    } catch (error) {
      this.logger.error('Error checking user existence', error);
      throw new Error("Error checking user existence");
    }
  }

  async sendOTPEmail(email: string, otp: string) {
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
    } catch (error) {
      this.logger.error('Error sending OTP email', error);
      throw new Error("Error sending email");
    }
  }

  async handleForgetPassword(email: string) {
    try {
      const user = await this.checkUserExists(email);
      if (!user) {
        throw new Error("No user found with this email address");
      }

      // Clear any existing OTPs for this email to prevent accumulation
      await this.otpModel.deleteMany({ email: email.toLowerCase() });

      const otp = this.generateOTP();
      const hashedOtp = await this.hashOTP(otp);

      // Store hashed OTP with proper expiration
      await this.otpModel.create({
        email: email.toLowerCase(),
        otp: hashedOtp, // Store hashed, not plain text
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        isUsed: false,
      });

      // Send plain OTP via email
      await this.sendOTPEmail(email, otp);

      return {
        success: true,
        message: "OTP sent successfully to your email",
        email: email,
      };
    } catch (error) {
      this.logger.error('Forget password error', error);
      throw error;
    }
  }

  async verifyOTP(email: string, otp: string) {
    try {
      // Get all valid, unused OTPs for this email
      const otpRecords = await this.otpModel.find({
        email: email.toLowerCase(),
        isUsed: false,
        expiresAt: { $gt: new Date() }
      }).sort({ createdAt: -1 });

      if (!otpRecords.length) {
        throw new Error("Invalid or expired OTP");
      }

      // Use constant-time comparison to prevent timing attacks
      let isValidOtp = false;
      let validRecord = null;

      // Check all records to prevent timing-based enumeration
      for (const record of otpRecords) {
        const isMatch = await this.compareOTP(otp, record.otp);
        if (isMatch && !isValidOtp) { // Only set the first match
          isValidOtp = true;
          validRecord = record;
        }
      }

      if (!isValidOtp || !validRecord) {
        throw new Error("Invalid or expired OTP");
      }

      // Mark the OTP as used and clear all others for this email
      await this.otpModel.updateMany(
        { email: email.toLowerCase() },
        { isUsed: true }
      );

      return {
        success: true,
        message: "OTP verified successfully",
        email: email
      };
    } catch (error) {
      this.logger.error('OTP verification error', error);
      throw error;
    }
  }

  async resetPassword(email: string, newPassword: string) {
    try {
      const user = await this.checkUserExists(email);
      if (!user) {
        throw new Error("No user found with this email address");
      }

      // Ensure password meets minimum requirements
      if (newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const saltRounds = 12; // Higher salt rounds for production
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      await this.userModel.findByIdAndUpdate(user._id, {
        password: hashedPassword
      });

      // Clear all OTPs for this email after successful reset
      await this.otpModel.deleteMany({ email: email.toLowerCase() });

      this.logger.log(`Password reset successful for email: ${email}`);

      return {
        success: true,
        message: "Password reset successfully",
        email: email
      };
    } catch (error) {
      this.logger.error('Password reset error', error);
      throw error;
    }
  }
}