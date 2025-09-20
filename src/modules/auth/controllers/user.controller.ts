import { Controller, Get, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth/users')
@UseGuards(JwtAuthGuard, ThrottlerGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Throttle({ default: { limit: 30, ttl: 60000 } }) // 30 user list requests per minute
  async getUsers() {
    try {
      const users = await this.userService.getUsers();
      return {
        success: true,
        message: "Users fetched successfully",
        data: { users }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: "Error fetching users",
        error: errorMessage
      };
    }
  }
}