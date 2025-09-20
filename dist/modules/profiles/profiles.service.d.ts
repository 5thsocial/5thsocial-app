import { Model } from 'mongoose';
import { IProfile } from './interfaces/profile.interface.js';
import type { ProfileCreate, ProfileUpdate } from './profile.dto.js';
export declare class ProfilesService {
    private model;
    constructor(model: Model<IProfile>);
    create(dto: ProfileCreate): Promise<IProfile>;
    findAll(): Promise<IProfile[]>;
    findOne(id: string): Promise<IProfile | null>;
    findByUserId(userId: string): Promise<IProfile[]>;
    findByHandle(handle: string): Promise<IProfile | null>;
    update(id: string, dto: ProfileUpdate): Promise<IProfile | null>;
    remove(id: string): Promise<IProfile | null>;
    isHandleAvailable(handle: string, excludeProfileId?: string): Promise<boolean>;
    getProfileStats(): Promise<any>;
}
