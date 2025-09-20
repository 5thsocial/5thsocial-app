import { PostsSharesService } from './posts-shares.service.js';
export declare class PostsSharesController {
    private readonly svc;
    constructor(svc: PostsSharesService);
    list(parentId: string): import("mongoose").Query<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], any, {}, any, "find", {}>;
    create(parentId: string, body: any): Promise<any>;
    update(parentId: string, id: string, body: any): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    remove(parentId: string, id: string): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
}
