import { Model } from 'mongoose';
import { User } from '../models/user.model';
export declare class ProfileService {
    private userModel;
    constructor(userModel: Model<User>);
    getProfile(userId: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    editProfile(userId: string, updateData: any): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string, confirmPassword: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
