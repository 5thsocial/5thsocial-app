import { Controller, Get, Req, Res, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { FacebookAuthService } from '../services/facebookAuth.service';

@Controller('auth/facebook')
@UseGuards(ThrottlerGuard)
export class FacebookAuthController {
  private readonly logger = new Logger(FacebookAuthController.name);

  constructor(private readonly facebookAuthService: FacebookAuthService) {}

  @Get()
  @UseGuards(AuthGuard('facebook'))
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async facebookAuth() {
    // This route initiates Facebook OAuth
    // Passport will handle the redirect to Facebook
  }

  @Get('callback')
  @UseGuards(AuthGuard('facebook'))
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async facebookCallback(@Req() req: Request, @Res() res: Response) {
    try {
      if (!req.user) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const html = this.createErrorPage(frontendUrl, 'Facebook authentication failed - no user data received');
        return res.send(html);
      }

      const result = await this.facebookAuthService.handleFacebookAuth(req.user);

      if (result.success && result.data) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const { user, token } = result.data;
        
        const html = this.createSuccessPage(frontendUrl, {
          token,
          user,
          message: result.message || 'Facebook authentication successful'
        });
        
        return res.send(html);
      } else {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const html = this.createErrorPage(frontendUrl, 'Facebook authentication failed');
        return res.send(html);
      }

    } catch (error) {
      this.logger.error('Facebook callback error', error);
      
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const html = this.createErrorPage(frontendUrl, 'Internal server error during Facebook authentication');
      return res.send(html);
    }
  }

  private createSuccessPage(frontendUrl: string, data: { token: string; user: any; message: string }) {
    const { token, user, message } = data;
    const userJson = JSON.stringify(user).replace(/"/g, '&quot;');
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facebook Authentication</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .success { color: #28a745; }
          .loading { margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="loading">
          <div>Processing Facebook authentication...</div>
          <div style="margin-top: 20px;">
            <div style="width: 20px; height: 20px; border: 2px solid #1877f2; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
          </div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <script>
          try {
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_AUTH_SUCCESS',
                data: {
                  token: '${token}',
                  user: JSON.parse('${userJson}'),
                  message: '${message}'
                }
              }, '${frontendUrl}');
              window.close();
            } else {
              localStorage.setItem('authToken', '${token}');
              localStorage.setItem('user', '${userJson}');
              window.location.href = '${frontendUrl}';
            }
          } catch (error) {
            console.error('Authentication processing error:', error);
            if (window.opener) {
              window.opener.postMessage({
                type: 'FACEBOOK_AUTH_ERROR',
                error: 'Failed to process authentication'
              }, '${frontendUrl}');
              window.close();
            } else {
              window.location.href = '${frontendUrl}?error=auth_processing_failed';
            }
          }
        </script>
      </body>
      </html>
    `;
  }

  private createErrorPage(frontendUrl: string, errorMessage: string) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facebook Authentication Error</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .error { color: #dc3545; }
        </style>
      </head>
      <body>
        <div class="error">
          <h2>Authentication Error</h2>
          <p>${errorMessage}</p>
          <p>Redirecting...</p>
        </div>
        <script>
          if (window.opener) {
            window.opener.postMessage({
              type: 'FACEBOOK_AUTH_ERROR',
              error: '${errorMessage}'
            }, '${frontendUrl}');
            window.close();
          } else {
            setTimeout(() => {
              window.location.href = '${frontendUrl}?error=' + encodeURIComponent('${errorMessage}');
            }, 2000);
          }
        </script>
      </body>
      </html>
    `;
  }
}