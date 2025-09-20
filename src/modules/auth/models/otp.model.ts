import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class OTP extends Document {
  @Prop({ required: true, lowercase: true })
  email!: string; 

  @Prop({ required: true })
  otp!: string; 

  @Prop({ required: true, default: () => new Date(Date.now() + 10 * 60 * 1000) })
  expiresAt!: Date; 

  @Prop({ default: false })
  isUsed!: boolean; 
}

export const OTPSchema = SchemaFactory.createForClass(OTP);
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

