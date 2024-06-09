import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { ValidateOtpDto } from './dto/otp.dto';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Public()
  @ResponseMessage(RESPONSE_CONSTANT.OTP.OTP_VALID)
  @Post('/verify')
  async verifyOTP(@Body() payload: ValidateOtpDto) {
    await this.otpService.validateOTP(payload);
  }
}
