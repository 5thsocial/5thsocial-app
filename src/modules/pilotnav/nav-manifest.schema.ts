import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NavManifestDocument = HydratedDocument<NavManifest>;

@Schema({ collection: 'nav_manifests', timestamps: true })
export class NavManifest {
  @Prop({ required: true })
  version!: string; // Note the ! after version

  @Prop({ type: Object, required: true })
  data!: any; // Note the ! after data
}

export const NavManifestSchema = SchemaFactory.createForClass(NavManifest);