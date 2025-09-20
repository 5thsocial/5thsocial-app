import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ProfileService } from '../services/profile.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtUser } from '../strategies/jwt.strategy';

@Controller('auth/profile')
@UseGuards(JwtAuthGuard, ThrottlerGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@CurrentUser() user: JwtUser) {
    try {
      const profile = await this.profileService.getProfile(user.sub);
      return {
        success: true,
        message: "Profile fetched successfully",
        data: { user: profile },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: "Error fetching profile",
        error: errorMessage,
      };
    }
  }

  @Put()
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 profile updates per minute
  async editProfile(
    @CurrentUser() user: JwtUser,
    @Body() body: { name: string; email: string }
  ) {
    try {
      const { name, email } = body;

      if (!name || !email) {
        return {
          success: false,
          message: "Name and email are required",
        };
      }

      const updatedUser = await this.profileService.editProfile(user.sub, {
        name,
        email,
      });
      return {
        success: true,
        message: "Profile updated successfully",
        data: { user: updatedUser },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage === "Email already exists") {
        return {
          success: false,
          message: "Email already exists",
          error: errorMessage,
        };
      }
      return {
        success: false,
        message: "Error updating profile",
        error: errorMessage,
      };
    }
  }

  @Put('change-password')
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 password changes per minute (strict)
  async changePassword(
    @CurrentUser() user: JwtUser,
    @Body() body: { oldPassword: string; newPassword: string; confirmPassword: string }
  ) {
    try {
      const { oldPassword, newPassword, confirmPassword } = body;

      if (!oldPassword || !newPassword || !confirmPassword) {
        return {
          success: false,
          message: "Old password, new password, and confirm password are required",
        };
      }

      if (newPassword.length < 6) {
        return {
          success: false,
          message: "New password must be at least 6 characters long",
        };
      }

      const updatedUser = await this.profileService.changePassword(
        user.sub,
        oldPassword,
        newPassword,
        confirmPassword
      );

      return {
        success: true,
        message: "Password changed successfully",
        data: { user: updatedUser },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage === "Old password is incorrect") {
        return {
          success: false,
          message: "Old password is incorrect",
          error: errorMessage,
        };
      }

      if (errorMessage === "New password and confirm password do not match") {
        return {
          success: false,
          message: "New password and confirm password do not match",
          error: errorMessage,
        };
      }

      if (errorMessage === "New password must be different from old password") {
        return {
          success: false,
          message: "New password must be different from old password",
          error: errorMessage,
        };
      }

      return {
        success: false,
        message: "Error changing password",
        error: errorMessage,
      };
    }
  }
}