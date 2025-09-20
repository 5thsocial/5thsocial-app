import type { Model } from "mongoose";
export declare class PostsSharesService {
    private model;
    constructor(model: Model<any>);
    list(parentId: string): import("mongoose").Query<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], any, {}, any, "find", {}>;
    create(dto: any): Promise<any>;
    update(id: string, parentId: string, dto: any): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    remove(id: string, parentId: string): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
}
