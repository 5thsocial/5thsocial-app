// src/modules/auth/controllers/signup.controller.ts (Updated - Return token in response)
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { SignupService } from '../services/signup.service';
import { SignupDto } from '../dto/signup.dto';
import { ZodValidationPipe } from '../../../common/pipes/zod-validation.pipe';

@Controller('auth/signup')
@UseGuards(ThrottlerGuard)
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async createUser(@Body(new ZodValidationPipe(SignupDto)) body: SignupDto) {
    try {
      const { token, user } = await this.signupService.createUser(body);  // Now returns {token, user}
      return {
        success: true,
        message: "Account created successfully. You are now logged in.",
        data: { token, user }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('already exists')) {
        return {
          success: false,
          message: 'An account with this email already exists. Please sign in.',
          error: errorMessage
        };
      }
      
      return {
        success: false,
        message: "Error creating account",
        error: errorMessage
      };
    }
  }
}