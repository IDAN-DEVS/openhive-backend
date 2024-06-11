import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Project } from 'src/module/v1/project/schema/project.schema';
import { User } from 'src/module/v1/user/schemas/user.schema';

export type RatingDocument = Rating & Document;

@Schema({ timestamps: true })
export class Rating {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  project: string;

  @Prop({ enum: [1, 2, 3, 4, 5], default: 0 })
  rating: number;

  @Prop()
  comment: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);

RatingSchema.index({ project: 1, user: 1 }, { unique: true });

RatingSchema.pre('find', function (next) {
  // remove deleted ratings
  this.where({ isDeleted: false });

  next();
});
