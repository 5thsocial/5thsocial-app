import { Model } from 'mongoose';
import { NavManifestDocument } from './nav-manifest.schema';
export declare class NavService {
    private model;
    constructor(model: Model<NavManifestDocument>);
    latest(): Promise<any>;
    upsert(token: string, body: any): Promise<{
        ok: boolean;
    }>;
    state(): Promise<any>;
}
