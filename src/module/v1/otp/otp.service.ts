import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OTP, OTPDocument } from './schemas/otp.schema';
import { Model } from 'mongoose';
import { BaseHelper } from 'src/common/utils/helper.util';
import { CreateOtpDto, SendOtpDto, ValidateOtpDto, VerifyOtpDto } from './dto/otp.dto';
import { MailService } from '../mail/mail.service';
import { OtpTypeEnum } from 'src/common/enums/otp.enum';
import { VerifyEmailTemplate } from '../mail/templates/verify-email.email';
import { ForgotPasswordTemplate } from '../mail/templates/forgot-password.email';

@Injectable()
export class OtpService {
  constructor(@InjectModel(OTP.name) private otpModel: Model<OTPDocument>, private readonly mailService: MailService) {}

  async createOTP(payload: CreateOtpDto): Promise<OTPDocument> {
    return this.otpModel.findOneAndUpdate({ email: payload.email }, payload, {
      upsert: true,
      new: true,
    });
  }

  async getOtpById(id: string): Promise<OTPDocument> {
    return this.otpModel.findById(id);
  }

  async getOtpByEmail(email: string): Promise<OTPDocument> {
    return this.otpModel.findOne({ email });
  }

  async getOtpByCode(code: number): Promise<OTPDocument> {
    return this.otpModel.findOne({ code });
  }

  async validateOTP(payload: ValidateOtpDto) {
    const { email, code, type } = payload;

    const otp = await this.otpModel.findOne({ email, code, type });

    if (!otp) {
      throw new NotFoundException('Invalid OTP code');
    }

    return otp;
  }

  async verifyOTP(payload: VerifyOtpDto) {
    const otp = await this.validateOTP(payload);

    await this.deleteOTP(otp._id.toString());

    return true;
  }

  async sendOTP(payload: SendOtpDto) {
    const { email, type } = payload;

    const code = BaseHelper.generateOTP();

    let template: string;
    let subject: string;

    switch (type) {
      case OtpTypeEnum.RESET_PASSWORD:
        template = ForgotPasswordTemplate({ code });
        subject = 'Reset Your Password';
        break;
      case OtpTypeEnum.VERIFY_EMAIL:
        template = VerifyEmailTemplate({ code });
        subject = 'Verify Email';
        break;
    }

    const otp = await this.createOTP({
      email,
      code,
      type,
    });

    if (!otp) throw new InternalServerErrorException('Unable to send otp at the moment , try again later');

    await this.mailService.sendEmail(email, subject, template);
  }

  async deleteOTP(id: string) {
    return this.otpModel.findByIdAndDelete(id);
  }
}
