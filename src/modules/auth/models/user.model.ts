import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name!: string; 

  @Prop({ required: true, unique: true, lowercase: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ type: [String], default: ['user'] })
  roles!: string[];

  @Prop({ type: String, enum: ['active', 'inactive', 'suspended', 'pending'], default: 'active' })
  status!: string;

  @Prop({ type: Date, default: null })
  lastLoginAt?: Date;

  @Prop({ type: Date, default: null })
  emailVerifiedAt?: Date;

  @Prop({ type: Boolean, default: false })
  isEmailVerified!: boolean;

  @Prop({ type: String, default: null })
  resetPasswordToken?: string;

  @Prop({ type: Date, default: null })
  resetPasswordExpires?: Date;

  @Prop({ type: String, default: null })
  otpCode?: string;

  @Prop({ type: Date, default: null })
  otpExpires?: Date;

  @Prop({ type: Number, default: 0 })
  failedLoginAttempts!: number;

  @Prop({ type: Date, default: null })
  lockedUntil?: Date;

  @Prop({ type: Object, default: {} })
  profile?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
    timezone?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ roles: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ resetPasswordToken: 1 });
UserSchema.index({ otpCode: 1 });
UserSchema.index({ lockedUntil: 1 });
UserSchema.index({ lastLoginAt: 1 });

// Virtual to check if account is locked
UserSchema.virtual('isLocked').get(function() {
  return !!(this.lockedUntil && this.lockedUntil > new Date());
});