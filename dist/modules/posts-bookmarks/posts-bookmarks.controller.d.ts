import { PostsBookmarksService } from './posts-bookmarks.service.js';
export declare class PostsBookmarksController {
    private readonly svc;
    constructor(svc: PostsBookmarksService);
    list(parentId: string): import("mongoose").Query<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], any, {}, any, "find", {}>;
    create(parentId: string, body: any): Promise<any>;
    update(parentId: string, id: string, body: any): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    remove(parentId: string, id: string): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
}
