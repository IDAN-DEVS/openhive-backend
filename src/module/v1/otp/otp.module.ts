import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OTP, OTPSchema } from './schemas/otp.schema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: OTP.name, schema: OTPSchema }]), MailModule],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
