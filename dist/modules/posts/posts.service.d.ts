import type { Model } from 'mongoose';
import type { PostCreate, PostUpdate } from './post.dto.js';
export declare class PostsService {
    private model;
    constructor(model: Model<any>);
    create(dto: PostCreate): Promise<any>;
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
    update(id: string, dto: PostUpdate): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    publish(id: string): Promise<any>;
}
