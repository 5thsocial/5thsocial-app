import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { LoginService } from '../services/login.service';
import { LoginDto } from '../dto/login.dto';
import { ZodValidationPipe } from '../../../common/pipes/zod-validation.pipe';

@Controller('auth/login')
@UseGuards(ThrottlerGuard)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 login attempts per minute per IP
  async login(@Body(new ZodValidationPipe(LoginDto)) body: LoginDto) {
    try {
      const { email, password } = body;
      const { token, user } = await this.loginService.loginUser(email, password);
      return { 
        success: true,
        message: 'Login successful',
        data: { token, user }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      return { 
        success: false,
        message: errorMessage 
      };
    }
  }
}