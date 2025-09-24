import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NavManifest, NavManifestSchema } from './nav-manifest.schema';
import { NavController } from './nav.controller';
import { NavService } from './nav.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: NavManifest.name, schema: NavManifestSchema }])],
  controllers: [NavController],
  providers: [NavService],
  exports: []
})
export class NavModule {}
