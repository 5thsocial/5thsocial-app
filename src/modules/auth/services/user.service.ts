// src/modules/auth/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return this.userModel.find({}).exec();
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ email: email.toLowerCase() }).exec();
    } catch (error) {
      return null;
    }
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData);
    return await user.save();
  }

  async updateById(id: string, updateData: Partial<User>): Promise<User | null> {
    try {
      return await this.userModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .exec();
    } catch (error) {
      return null;
    }
  }

  async updateRoles(id: string, roles: string[]): Promise<User | null> {
    try {
      return await this.userModel
        .findByIdAndUpdate(id, { roles }, { new: true })
        .exec();
    } catch (error) {
      return null;
    }
  }

  async deactivateUser(id: string): Promise<User | null> {
    try {
      return await this.userModel
        .findByIdAndUpdate(id, { status: 'inactive' }, { new: true })
        .exec();
    } catch (error) {
      return null;
    }
  }
}