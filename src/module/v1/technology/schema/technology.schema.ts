import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TechnologyDocument = Technology & mongoose.Document;

@Schema({ timestamps: true })
export class Technology {
  @Prop({ required: true, index: true, unique: true })
  name: string;

  @Prop()
  iconUrl: string;
}

export const TechnologySchema = SchemaFactory.createForClass(Technology);
