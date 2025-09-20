import { PostsReportsService } from './posts-reports.service.js';
export declare class PostsReportsController {
    private readonly svc;
    constructor(svc: PostsReportsService);
    list(parentId: string): import("mongoose").Query<(import("mongoose").FlattenMaps<any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], any, {}, any, "find", {}>;
    create(parentId: string, body: any): Promise<any>;
    update(parentId: string, id: string, body: any): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
    remove(parentId: string, id: string): import("mongoose").Query<any, any, {}, any, "findOneAndUpdate", {}>;
}
