import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from './models/user.model';
import { OTP, OTPSchema } from './models/otp.model';
import { FacebookStrategy } from '../../configurations/facebookOAuthConfig';
import { GoogleStrategy } from '../../configurations/googleOAuthConfig';
import { JwtStrategy } from './strategies/jwt.strategy';
import { FacebookAuthService } from './services/facebookAuth.service';
import { GoogleAuthService } from './services/googleAuth.service';
import { LoginService } from './services/login.service';
import { SignupService } from './services/signup.service';
import { ForgetPasswordService } from './services/forgetPassword.service';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';
import { FacebookAuthController } from './controllers/facebookAuth.controller';
import { GoogleAuthController } from './controllers/googleAuth.controller';
import { LoginController } from './controllers/login.controller';
import { SignupController } from './controllers/signup.controller';
import { ForgetPasswordController } from './controllers/forgetPassword.controller';
import { ProfileController } from './controllers/profile.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: OTP.name, schema: OTPSchema }
    ]),
    PassportModule.register({ 
      session: true,  // Enable session support for OAuth
      defaultStrategy: 'jwt'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET environment variable is required');
        }
        return {
          secret,
          signOptions: { 
            expiresIn: '1h',
            issuer: configService.get<string>('JWT_ISS') || '5thsocial',
            audience: configService.get<string>('JWT_AUD') || 'api',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [
    FacebookAuthController,
    GoogleAuthController,
    LoginController,
    SignupController,
    ForgetPasswordController,
    ProfileController,
    UserController
  ],
  providers: [
    FacebookStrategy,
    GoogleStrategy,
    JwtStrategy,
    FacebookAuthService,
    GoogleAuthService,
    LoginService,
    SignupService,
    ForgetPasswordService,
    ProfileService,
    UserService
  ],
  exports: [PassportModule, JwtModule, UserService]
})
export class AuthModule {}