import { Model } from 'mongoose';
import { User } from '../models/user.model';
export declare class SignupService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(userData: any): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
