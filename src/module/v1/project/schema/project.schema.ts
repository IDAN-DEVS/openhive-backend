import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Technology } from 'src/module/v1/technology/schema/technology.schema';
import { User } from 'src/module/v1/user/schemas/user.schema';

export type ProjectDocument = Project & mongoose.Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  owner: string;

  @Prop({ required: true })
  projectUrl: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Technology.name }], default: [] })
  technologies: Technology[];

  @Prop({ default: 0 })
  totalViews: number;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
