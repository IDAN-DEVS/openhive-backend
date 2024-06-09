import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserRoleEnum } from '../enums/user.enum';
import mongoose from 'mongoose';

export interface ILoggedInUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
  school: mongoose.Schema.Types.ObjectId;
  course: mongoose.Schema.Types.ObjectId;
  preferredLanguages: mongoose.Schema.Types.ObjectId[];
  country?: string;
  countryCode?: string;
  skills?: string[];
}

export const LoggedInUserDecorator = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
