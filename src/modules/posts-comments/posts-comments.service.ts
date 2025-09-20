import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
@Injectable()
export class PostsCommentsService {
  constructor(@InjectModel('PostsComments') private model: Model<any>) { }
  list(parentId: string) { return this.model.find({ parent_id: parentId }).limit(200).lean(); }
  create(dto: any) { return this.model.create({ ...dto, status_date: new Date() }); }
  update(id: string, parentId: string, dto: any) {
    return this.model.findOneAndUpdate({ posts_comments_id: id, parent_id: parentId }, { ...dto, status_date: new Date() }, { new: true });
  }
  remove(id: string, parentId: string) {
    return this.model.findOneAndUpdate({ posts_comments_id: id, parent_id: parentId }, { status_code: 'deleted', deleted_at: new Date(), status_date: new Date() }, { new: true });
  }
}
