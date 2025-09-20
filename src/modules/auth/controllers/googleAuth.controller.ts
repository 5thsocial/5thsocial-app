import { Controller, Get, Req, Res, Redirect, Logger, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { GoogleAuthService } from '../services/googleAuth.service';

@Controller('auth/google')
@UseGuards(ThrottlerGuard)
export class GoogleAuthController {
  private readonly logger = new Logger(GoogleAuthController.name);

  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get('callback')
  @Redirect()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    try {
      if (!req.user) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const errorUrl = `${frontendUrl}/google-success.html?error=${encodeURIComponent('Google authentication failed - no user data received')}`;
        return { url: errorUrl };
      }

      const result = await this.googleAuthService.handleGoogleAuth(req.user);

      if (result.success && result.data) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const { user, token } = result.data;
        
        const successUrl = `${frontendUrl}/google-success.html?` +
          `token=${encodeURIComponent(token)}&` +
          `user=${encodeURIComponent(JSON.stringify(user))}&` +
          `message=${encodeURIComponent(result.message || 'Google authentication successful')}`;
        
        return { url: successUrl };
      } else {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const errorUrl = `${frontendUrl}/google-success.html?error=${encodeURIComponent('Authentication failed')}`;
        return { url: errorUrl };
      }

    } catch (error) {
      this.logger.error('Google callback error', error);
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const errorUrl = `${frontendUrl}/google-success.html?error=${encodeURIComponent('Internal server error during Google authentication')}`;
      return { url: errorUrl };
    }
  }

  @Get('auth-url')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async getGoogleAuthUrl() {
    try {
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
        `redirect_uri=${process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback'}&` +
        `response_type=code&` +
        `scope=profile email&` +
        `access_type=offline&` +
        `prompt=consent`;

      return {
        success: true,
        message: 'Google OAuth URL generated',
        data: {
          authUrl: googleAuthUrl
        }
      };

    } catch (error) {
      this.logger.error('Google auth URL error', error);
      return {
        success: false,
        message: 'Error generating Google OAuth URL'
      };
    }
  }

  @Get('success')
  async googleSuccess() {
    try {
      return {
        success: true,
        message: 'Google authentication successful. Please use the callback endpoint for API integration.'
      };
    } catch (error) {
      this.logger.error('Google success error', error);
      return {
        success: false,
        message: 'Internal server error'
      };
    }
  }

  @Get('failure')
  async googleFailure() {
    try {
      return {
        success: false,
        message: 'Google authentication failed'
      };
    } catch (error) {
      this.logger.error('Google failure error', error);
      return {
        success: false,
        message: 'Internal server error'
      };
    }
  }
}