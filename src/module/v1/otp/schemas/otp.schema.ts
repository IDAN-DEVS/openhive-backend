import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OTPDocument = OTP & Document;

@Schema({ expires: 600 })
export class OTP {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  code: number;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: Date.now, expires: 600 })
  expiresAt: Date;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);
