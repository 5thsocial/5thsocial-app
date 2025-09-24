import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NavManifest, NavManifestDocument } from './nav-manifest.schema';

@Injectable()
export class NavService {
  constructor(@InjectModel(NavManifest.name) private model: Model<NavManifestDocument>) {}

  async latest(): Promise<any> {
    const doc = await this.model.findOne({}, {}, { sort: { updatedAt: -1 } }).lean();
    if (!doc) {
      // seed a minimal manifest
      const seed = { version: '1.0.0', data: { apps: [{ key:'friends', label:'Friends' }]} };
      await this.model.create(seed);
      return seed.data;
    }
    return doc.data;
  }

  async upsert(token: string, body: any): Promise<{ ok: boolean }>{ 
    const admin = process.env.ADMIN_TOKEN || 'changeme';
    if (!token || token !== admin) throw new UnauthorizedException('invalid token');
    const { version, data } = body || {};
    if (!version || !data) throw new Error('version and data required');
    await this.model.updateOne({ version }, { $set: { data } }, { upsert: true });
    return { ok: true };
  }

  async state(): Promise<any> {
    // placeholder counts; wire your real services here
    return { counts: { activeCampaigns: 0, missions: 0 } };
  }
}
