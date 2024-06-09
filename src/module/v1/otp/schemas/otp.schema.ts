import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OtpTypeEnum } from 'src/common/enums/otp.enum';

export type OTPDocument = OTP & Document;

@Schema({ expires: 300 })
export class OTP {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ required: true, enum: OtpTypeEnum })
  type: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: Date.now(), expires: 300 })
  expiresAt: Date;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);
