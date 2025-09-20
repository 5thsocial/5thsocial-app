import { MissionsService } from './missions.service.js';
export declare class MissionsController {
    private readonly svc;
    constructor(svc: MissionsService);
    create(body: any): Promise<any>;
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
    update(id: string, body: any): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
}
