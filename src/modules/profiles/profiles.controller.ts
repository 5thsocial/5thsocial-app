import { 
  Controller, Get, Post, Param, Body, Patch, Delete, 
  UsePipes, UseGuards, HttpException, HttpStatus 
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ZodValidationPipe } from '../../common/zod.pipe.js';
import { ProfilesService } from './profiles.service.js';
import { ProfileCreateDto, ProfileUpdateDto } from './profile.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { JwtUser } from '../auth/strategies/jwt.strategy.js';

@ApiTags('profiles')
@Controller('profiles')
@UseGuards(JwtAuthGuard, RolesGuard, ThrottlerGuard)
@ApiBearerAuth()
export class ProfilesController {
  constructor(private readonly svc: ProfilesService) {}

  @Post()
  @Roles('user', 'admin')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiBody({ schema: { example: {
    "prf_profile_id": "UUID",
    "usr_user_id": "UUID", 
    "prf_handle": "grego",
    "prf_display_name": "Greg O",
    "status_code": "active"
  }}})
  @ApiResponse({ status: 201, description: 'Profile created successfully' })
  @UsePipes(new ZodValidationPipe(ProfileCreateDto))
  async create(
    @CurrentUser() user: JwtUser,
    @Body() body: any
  ) {
    try {
      // Ensure user can only create profiles for themselves (unless admin)
      if (!user.roles.includes('admin') && body.usr_user_id !== user.sub) {
        throw new HttpException(
          'You can only create profiles for yourself',
          HttpStatus.FORBIDDEN
        );
      }

      // Set the user ID from the authenticated user if not admin
      if (!user.roles.includes('admin')) {
        body.usr_user_id = user.sub;
      }

      const result = await this.svc.create(body);
      return {
        success: true,
        message: 'Profile created successfully',
        data: result
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('duplicate') || errorMessage.includes('handle')) {
        throw new HttpException('Profile handle already exists', HttpStatus.CONFLICT);
      }

      throw new HttpException(
        'Error creating profile',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  @Roles('user', 'admin')
  @ApiResponse({ status: 200, description: 'Profiles retrieved successfully' })
  async findAll(@CurrentUser() user: JwtUser) {
    try {
      let profiles;

      if (user.roles.includes('admin')) {
        // Admins can see all profiles
        profiles = await this.svc.findAll();
      } else {
        // Regular users can only see their own profiles
        profiles = await this.svc.findByUserId(user.sub);
      }

      return {
        success: true,
        message: 'Profiles retrieved successfully',
        data: profiles
      };
    } catch (error) {
      throw new HttpException(
        'Error retrieving profiles',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  @Roles('user', 'admin')
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async findOne(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string
  ) {
    try {
      const profile = await this.svc.findOne(id);
      
      if (!profile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }

      // Type assertion to access usr_user_id safely
      const profileData = profile as any;

      // Check if user has access to this profile
      if (!user.roles.includes('admin') && profileData.usr_user_id !== user.sub) {
        throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
      }

      return {
        success: true,
        message: 'Profile retrieved successfully',
        data: profile
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error retrieving profile',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Patch(':id')
  @Roles('user', 'admin')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UsePipes(new ZodValidationPipe(ProfileUpdateDto))
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async update(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string, 
    @Body() body: any
  ) {
    try {
      // First, check if profile exists and user has access
      const existingProfile = await this.svc.findOne(id);
      
      if (!existingProfile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }

      // Type assertion to access usr_user_id safely
      const profileData = existingProfile as any;

      // Check ownership (unless admin)
      if (!user.roles.includes('admin') && profileData.usr_user_id !== user.sub) {
        throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
      }

      const updatedProfile = await this.svc.update(id, body);
      
      if (!updatedProfile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }

      return {
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('duplicate') || errorMessage.includes('handle')) {
        throw new HttpException('Profile handle already exists', HttpStatus.CONFLICT);
      }

      throw new HttpException(
        'Error updating profile',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  @Roles('user', 'admin')
  @Throttle({ default: { limit: 3, ttl: 300000 } })
  @ApiResponse({ status: 200, description: 'Profile deleted successfully' })
  async remove(
    @CurrentUser() user: JwtUser,
    @Param('id') id: string
  ) {
    try {
      // Check if profile exists and user has access
      const existingProfile = await this.svc.findOne(id);
      
      if (!existingProfile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }

      // Type assertion to access usr_user_id safely
      const profileData = existingProfile as any;

      // Check ownership (unless admin)
      if (!user.roles.includes('admin') && profileData.usr_user_id !== user.sub) {
        throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
      }

      const result = await this.svc.remove(id);
      
      if (!result) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }

      return {
        success: true,
        message: 'Profile deleted successfully'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Error deleting profile',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('user/:userId')
  @Roles('admin')
  @ApiResponse({ status: 200, description: 'User profiles retrieved successfully' })
  async findByUserId(@Param('userId') userId: string) {
    try {
      const profiles = await this.svc.findByUserId(userId);
      
      return {
        success: true,
        message: 'User profiles retrieved successfully',
        data: profiles
      };
    } catch (error) {
      throw new HttpException(
        'Error retrieving user profiles',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}