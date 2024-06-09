import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoleEnum } from '../../../../common/enums/user.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ select: false })
  password: string;

  @Prop({ enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Prop()
  birthday: Date;

  @Prop({ default: null })
  username: string;

  @Prop({ default: null })
  firstName: string;

  @Prop({ default: null })
  lastName: string;

  @Prop({ default: null })
  bio: string;

  @Prop({ default: null })
  profilePhoto: string;

  @Prop({ default: 0 })
  averageRating: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
