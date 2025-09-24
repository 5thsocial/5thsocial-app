import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
export type NavManifestDocument = HydratedDocument<NavManifest>;
export declare class NavManifest {
    version: string;
    data: any;
}
export declare const NavManifestSchema: MongooseSchema<NavManifest, import("mongoose").Model<NavManifest, any, any, any, import("mongoose").Document<unknown, any, NavManifest, any, {}> & NavManifest & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NavManifest, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<NavManifest>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<NavManifest> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
