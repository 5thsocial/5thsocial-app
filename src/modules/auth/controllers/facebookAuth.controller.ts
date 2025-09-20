import { Controller, Get, Req, Res, Redirect, Logger, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { FacebookAuthService } from '../services/facebookAuth.service';

@Controller('auth/facebook')
@UseGuards(ThrottlerGuard)
export class FacebookAuthController {
  private readonly logger = new Logger(FacebookAuthController.name);

  constructor(private readonly facebookAuthService: FacebookAuthService) {}

  @Get('callback')
  @Redirect()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async facebookCallback(@Req() req: Request, @Res() res: Response) {
    try {
      if (!req.user) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const errorUrl = `${frontendUrl}/facebook-success.html?error=${encodeURIComponent('Facebook authentication failed - no user data received')}`;
        return { url: errorUrl };
      }

      const result = await this.facebookAuthService.handleFacebookAuth(req.user);

      if (result.success && result.data) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const { user, token } = result.data;
        
        const successUrl = `${frontendUrl}/facebook-success.html?` +
          `token=${encodeURIComponent(token)}&` +
          `user=${encodeURIComponent(JSON.stringify(user))}&` +
          `message=${encodeURIComponent(result.message || 'Facebook authentication successful')}`;
        
        return { url: successUrl };
      } else {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const errorUrl = `${frontendUrl}/facebook-success.html?error=${encodeURIComponent('Authentication failed')}`;
        return { url: errorUrl };
      }

    } catch (error) {
      this.logger.error('Facebook callback error', error);
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const errorUrl = `${frontendUrl}/facebook-success.html?error=${encodeURIComponent('Internal server error during Facebook authentication')}`;
      return { url: errorUrl };
    }
  }

  @Get('auth-url')
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  async getFacebookAuthUrl() {
    try {
      const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
        `client_id=${process.env.FACEBOOK_APP_ID}&` +
        `redirect_uri=${process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/api/auth/facebook/callback'}&` +
        `response_type=code&` +
        `scope=email,public_profile`;

      return {
        success: true,
        message: 'Facebook OAuth URL generated',
        data: {
          authUrl: facebookAuthUrl
        }
      };

    } catch (error) {
      this.logger.error('Facebook auth URL error', error);
      return {
        success: false,
        message: 'Error generating Facebook OAuth URL'
      };
    }
  }

  @Get('success')
  async facebookSuccess() {
    try {
      return {
        success: true,
        message: 'Facebook authentication successful. Please use the callback endpoint for API integration.'
      };
    } catch (error) {
      this.logger.error('Facebook success error', error);
      return {
        success: false,
        message: 'Internal server error'
      };
    }
  }

  @Get('failure')
  async facebookFailure() {
    try {
      return {
        success: false,
        message: 'Facebook authentication failed'
      };
    } catch (error) {
      this.logger.error('Facebook failure error', error);
      return {
        success: false,
        message: 'Internal server error'
      };
    }
  }
}