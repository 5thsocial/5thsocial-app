import { PostsViewsService } from './posts-views.service.js';
export declare class PostsViewsController {
    private readonly svc;
    constructor(svc: PostsViewsService);
    list(parentId: string): import("mongoose").Query<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], any, {}, any, "find", {}>;
    create(parentId: string, body: any): Promise<any>;
    update(parentId: string, id: string, body: any): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    remove(parentId: string, id: string): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
}
