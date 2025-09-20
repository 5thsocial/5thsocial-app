import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../auth/services/user.service';

export interface JwtUser { 
  sub: string; 
  email: string; 
  roles: string[] 
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UserService
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      issuer: configService.get<string>('JWT_ISS') || '5thsocial',
      audience: configService.get<string>('JWT_AUD') || 'api',
    });
  }

  async validate(payload: any): Promise<JwtUser> {
    // Validate required fields
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token: missing subject');
    }

    if (!payload.email) {
      throw new UnauthorizedException('Invalid token: missing email');
    }

    // Fetch user from database to get current roles
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Ensure user is active
    if (user.status !== 'active') {
      throw new UnauthorizedException('User account is not active');
    }

    return { 
      sub: payload.sub.toString(), 
      email: payload.email,
      roles: Array.isArray(user.roles) ? user.roles : ['user']
    };
  }
}