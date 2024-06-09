import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from '../../../../common/enums/user.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ select: false })
  password: string;

  @Prop({ enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  bio: string;

  @Prop({ default: null })
  profilePhoto: string;

  @Prop({ default: 0 })
  averageRating: number;

  @Prop({ default: 0 })
  totalProjects: number;

  @Prop({ default: 0 })
  profileViews: number;

  @Prop({ default: null })
  facebookUrl: string;

  @Prop({ default: null })
  twitterUrl: string;

  @Prop({ default: null })
  githubUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
