import { Model } from 'mongoose';
import { User } from '../models/user.model';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getUsers(): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    updateById(id: string, updateData: Partial<User>): Promise<User | null>;
    updateRoles(id: string, roles: string[]): Promise<User | null>;
    deactivateUser(id: string): Promise<User | null>;
}
