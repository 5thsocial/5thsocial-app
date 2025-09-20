import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import type { PostCreate, PostUpdate } from './post.dto.js';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private model: Model<any>) { }
  create(dto: PostCreate) { return this.model.create({ ...dto, status_date: new Date() }); }
  findAll() { return this.model.find().limit(200).lean(); }
  findOne(id: string) { return this.model.findOne({ post_id: id }).lean(); }
  update(id: string, dto: PostUpdate) { return this.model.findOneAndUpdate({ post_id: id }, { ...dto, status_date: new Date() }, { new: true }); }
  remove(id: string) { return this.model.findOneAndUpdate({ post_id: id }, { status_code: 'deleted', deleted_at: new Date(), status_date: new Date() }, { new: true }); }
  
  async publish(id: string) {
    const post = await this.model.findOne({ pst_post_id: id });
    if (!post) return null;
    if (post.status_code !== 'draft' && post.status_code !== 'queued') {
      throw new Error('Only draft/queued can be published');
    }
    post.status_code = 'published';
    post.pst_published_at = new Date();
    post.status_date = new Date();
    await post.save();
    return post.toObject();
  }

}
