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
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 signups per minute per IP
  async createUser(@Body(new ZodValidationPipe(SignupDto)) body: SignupDto) {
    try {
      const user = await this.signupService.createUser(body);
      return {
        success: true,
        message: "User created successfully",
        data: { user }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: "Error creating user",
        error: errorMessage
      };
    }
  }
}