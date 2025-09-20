import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ForgetPasswordService } from '../services/forgetPassword.service';
import { ForgetPasswordDto, VerifyOtpDto, ResetPasswordDto } from '../dto/forget-password.dto';
import { ZodValidationPipe } from '../../../common/pipes/zod-validation.pipe';

@Controller('auth/forget-password')
@UseGuards(ThrottlerGuard)
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) {}

  @Post('send-mail')
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 requests per minute per IP
  async sendOTPEmail(@Body(new ZodValidationPipe(ForgetPasswordDto)) body: ForgetPasswordDto) {
    try {
      const { email } = body;
      const result = await this.forgetPasswordService.handleForgetPassword(email);

      return {
        success: true,
        message: result.message,
        data: {
          email: result.email,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage === "No user found with this email address") {
        return {
          success: false,
          message: "No user found with this email address",
        };
      }

      if (errorMessage === "Error sending email") {
        return {
          success: false,
          message: "Failed to send OTP email. Please try again later.",
        };
      }

      return {
        success: false,
        message: "Internal server error",
      };
    }
  }

  @Post('verify-otp')
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 attempts per minute per IP
  async verifyOTP(@Body(new ZodValidationPipe(VerifyOtpDto)) body: VerifyOtpDto) {
    try {
      const { email, otp } = body;
      const result = await this.forgetPasswordService.verifyOTP(email, otp);

      return {
        success: true,
        message: result.message,
        data: {
          email: result.email,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage === "Invalid or expired OTP") {
        return {
          success: false,
          message: "Invalid or expired OTP. Please request a new one.",
        };
      }

      return {
        success: false,
        message: "Internal server error",
      };
    }
  }

  @Post('reset-password')
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 password resets per minute per IP
  async resetPassword(@Body(new ZodValidationPipe(ResetPasswordDto)) body: ResetPasswordDto) {
    try {
      const { email, newPassword } = body;
      const result = await this.forgetPasswordService.resetPassword(email, newPassword);

      return {
        success: true,
        message: result.message,
        data: {
          email: result.email,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage === "No user found with this email address") {
        return {
          success: false,
          message: "No user found with this email address",
        };
      }

      return {
        success: false,
        message: "Internal server error",
      };
    }
  }
}