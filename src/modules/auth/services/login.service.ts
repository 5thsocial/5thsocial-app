import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async loginUser(email: string, password: string) {
    try {
      const user = await this.userModel.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      // Standardized JWT payload with sub, email, roles
      const payload = {
        sub: user._id,
        email: user.email,
        roles: user.roles || ['user']
      };

      const token = this.jwtService.sign(payload, { expiresIn: "1h" });

      return { 
        token, 
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email,
          roles: user.roles || ['user']
        } 
      };
    } catch (error) {
      this.logger.error('Login failed', error);
      throw new Error("Invalid credentials");
    }
  }
}