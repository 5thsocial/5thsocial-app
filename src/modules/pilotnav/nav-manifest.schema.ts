import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type NavManifestDocument = HydratedDocument<NavManifest>;

@Schema({ collection: 'nav_manifests', timestamps: true })
export class NavManifest {
  @Prop({ required: true })
  version!: string;

  @Prop({ 
    type: MongooseSchema.Types.Mixed, 
    required: true 
  })
  data!: any;
}

export const NavManifestSchema = SchemaFactory.createForClass(NavManifest);

// Ensure that nested objects are properly saved and retrieved
NavManifestSchema.set('minimize', false);
NavManifestSchema.set('strict', false);