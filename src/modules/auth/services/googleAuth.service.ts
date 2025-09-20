import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';

@Injectable()
export class GoogleAuthService {
  private readonly logger = new Logger(GoogleAuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  generateToken(user: any) {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      roles: user.roles || ['user']
    };
    
    return this.jwtService.sign(payload, { expiresIn: '24h' });
  }

  async findOrCreateUser(profile: any) {
    try {
      let user = await this.userModel.findOne({ 
        email: profile.emails[0].value.toLowerCase() 
      });

      if (user) {
        const token = this.generateToken(user);
        return {
          success: true,
          message: 'Login successful',
          data: {
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              roles: user.roles
            },
            token: token
          }
        };
      }

      const newUser = new this.userModel({
        name: profile.displayName,
        email: profile.emails[0].value.toLowerCase(),
        password: await bcrypt.hash(Math.random().toString(36), 10),
        roles: ['user']
      });

      await newUser.save();

      const token = this.generateToken(newUser);

      return {
        success: true,
        message: 'Account created and login successful',
        data: {
          user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            roles: newUser.roles
          },
          token: token
        }
      };

    } catch (error) {
      this.logger.error('Google auth error', error);
      throw new Error('Error processing Google authentication');
    }
  }

  async handleGoogleAuth(profile: any) {
    try {
      if (!profile || !profile.emails || !profile.emails[0]) {
        throw new Error('Invalid Google profile data');
      }

      return await this.findOrCreateUser(profile);
    } catch (error) {
      this.logger.error('Google auth handler error', error);
      throw error;
    }
  }
}