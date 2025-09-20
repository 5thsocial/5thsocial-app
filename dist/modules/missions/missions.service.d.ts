import type { Model } from 'mongoose';
import type { MissionCreate, MissionUpdate } from './mission.dto.js';
export declare class MissionsService {
    private model;
    constructor(model: Model<any>);
    create(dto: MissionCreate): Promise<any>;
    findAll(): import("mongoose").Query<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], any, {}, any, "find", {}>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | (import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, any, {}, any, "findOne", {}>;
    update(id: string, dto: MissionUpdate): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
}
