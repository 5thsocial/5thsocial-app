import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NavManifest, NavManifestDocument } from "./nav-manifest.schema";

@Injectable()
export class NavService {
  constructor(
    @InjectModel(NavManifest.name) private model: Model<NavManifestDocument>
  ) {}

  async latest(): Promise<any> {
    const doc = await this.model
      .findOne({}, {}, { sort: { updatedAt: -1 } })
      .lean();
      
    if (!doc) {
      console.log('No document found, creating seed data...');
      
      const seed = {
        version: "1.0.0",
        data: {
          apps: [
            {
              key: "Friends",
              label: "Friends",
              disabled: false,
              components: [
                {
                  key: "create",
                  label: "Create",
                  view: "Create",
                  icon: "📝",
                  type: "component",
                  workflows: [
                    {
                      key: "create_post",
                      label: "Create Post",
                      view: "CreatePost",
                      type: "workflow",
                      icon: "📄"
                    },
                    {
                      key: "create_campaign",
                      label: "Create Campaign", 
                      view: "CreateCampaign",
                      type: "workflow",
                      icon: "📢"
                    },
                    {
                      key: "create_mission",
                      label: "Create Mission",
                      view: "CreateMission", 
                      type: "workflow",
                      icon: "🎯"
                    },
                  ],
                },
                { 
                  key: "feed", 
                  label: "Feed", 
                  view: "Feed", 
                  icon: "📰",
                  type: "component" 
                },
                {
                  key: "campaigns",
                  label: "Campaigns",
                  view: "Campaigns",
                  icon: "📢",
                  type: "component",
                },
                {
                  key: "missions",
                  label: "Missions", 
                  view: "Missions",
                  icon: "🎯",
                  type: "component",
                },
                {
                  key: "profile",
                  label: "Profile",
                  view: "Profile",
                  icon: "👤", 
                  type: "component",
                },
              ],
            },
            {
              key: "Feed",
              label: "Feed",
              disabled: false,
              components: [
                { 
                  key: "home", 
                  label: "Home", 
                  view: "Home", 
                  icon: "🏠",
                  type: "component"
                },
                { 
                  key: "trending", 
                  label: "Trending", 
                  view: "Trending", 
                  icon: "🔥",
                  type: "component"
                },
                { 
                  key: "following", 
                  label: "Following", 
                  view: "Following", 
                  icon: "👥",
                  type: "component"
                },
              ],
            },
            {
              key: "Posts",
              label: "Posts",
              disabled: false,
              components: [
                { 
                  key: "create", 
                  label: "Create", 
                  view: "Create", 
                  icon: "✏️",
                  type: "component"
                },
                { 
                  key: "drafts", 
                  label: "Drafts", 
                  view: "Drafts", 
                  icon: "📝",
                  type: "component"
                },
                { 
                  key: "published", 
                  label: "Published", 
                  view: "Published", 
                  icon: "📤",
                  type: "component"
                },
              ],
            },
            {
              key: "Connections",
              label: "Connections",
              disabled: true,
              components: [],
            },
            {
              key: "Followers",
              label: "Followers",
              disabled: true,
              components: [],
            },
          ],
        },
      };
      
      console.log('Creating seed with data:', JSON.stringify(seed, null, 2));
      
      try {
        const created = await this.model.create(seed);
        console.log('Seed data created successfully:', created);
        
        // Verify what was actually saved
        const verification = await this.model.findById(created._id).lean();
        console.log('Verification - what was actually saved:', JSON.stringify(verification, null, 2));
        
        return seed.data;
      } catch (error) {
        console.error('Error creating seed data:', error);
        throw error;
      }
    }
    
    console.log('Found existing document:', JSON.stringify(doc, null, 2));
    return doc.data;
  }

  async upsert(token: string, body: any): Promise<{ ok: boolean }> {
    const admin = process.env.ADMIN_TOKEN || "changeme";
    if (!token || token !== admin)
      throw new UnauthorizedException("invalid token");
    const { version, data } = body || {};
    if (!version || !data) throw new Error("version and data required");
    
    console.log('Upserting data:', JSON.stringify({ version, data }, null, 2));
    
    await this.model.updateOne(
      { version },
      { $set: { data } },
      { upsert: true }
    );
    return { ok: true };
  }

  async state(): Promise<any> {
    // placeholder counts; wire your real services here
    return { counts: { activeCampaigns: 0, missions: 0 } };
  }
}