import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Project } from '../../project/schema/project.schema';

export type BookmarkDocument = Bookmark & mongoose.Document;

@Schema({ timestamps: true })
export class Bookmark {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  project: Project;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
