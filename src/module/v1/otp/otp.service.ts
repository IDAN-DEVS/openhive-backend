import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OTP, OTPDocument } from './schemas/otp.schema';
import { Model } from 'mongoose';
import { CreateOtpDto, ValidateOtpDto } from './dto/otp.dto';
import { MailService } from '../mail/mail.service';
import { ISendOtp } from 'src/common/interfaces/otp.interface';

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

  // this only checks if the otp is valid, it won't delete it
  async validateOTP(payload: ValidateOtpDto) {
    const { email, code } = payload;

    const otp = await this.otpModel.findOne({ email, code });

    if (!otp) {
      throw new NotFoundException('Invalid OTP code');
    }

    return otp;
  }

  async verifyOTP(payload: ValidateOtpDto) {
    const otp = await this.validateOTP(payload);

    await this.deleteOTP(otp._id.toString());

    return true;
  }

  async sendOTP(payload: ISendOtp) {
    const { email, title, template, code } = payload;

    const otp = await this.createOTP({
      email,
      code,
    });

    if (!otp) throw new InternalServerErrorException('Unable to send otp at the moment , try again later');

    await this.mailService.sendEmail(email, title, template);
  }

  async deleteOTP(id: string) {
    return this.otpModel.findByIdAndDelete(id);
  }
}
