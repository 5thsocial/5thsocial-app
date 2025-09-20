import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async editProfile(userId: string, updateData: any) {
    const { name, email } = updateData;

    if (email) {
      const existingUser = await this.userModel.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        throw new Error("Email already exists");
      }
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new Error("Old password is incorrect");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirm password do not match");
    }

    if (oldPassword === newPassword) {
      throw new Error("New password must be different from old password");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { password: hashedNewPassword },
      { new: true }
    ).select("-password");

    return updatedUser;
  }
}