// src/modules/auth/services/signup.service.ts (Updated - Generate token after create)
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';  // Add import
import { User } from '../models/user.model';

@Injectable()
export class SignupService {
  private readonly logger = new Logger(SignupService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService  // Inject for token gen
  ) {}

  async createUser(userData: any) {
    const { name, email, password } = userData;
    
    // Check if user exists
    const existingUser = await this.userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      roles: ['user'],
      status: 'active'
    });
    await createdUser.save();

    // Generate token (like login)
    const payload = {
      sub: createdUser._id,
      email: createdUser.email,
      roles: createdUser.roles
    };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    this.logger.log(`User created and auto-logged in: ${email}`);

    return { 
      token, 
      user: { 
        id: createdUser._id, 
        name: createdUser.name, 
        email: createdUser.email,
        roles: createdUser.roles
      } 
    };
  }
}