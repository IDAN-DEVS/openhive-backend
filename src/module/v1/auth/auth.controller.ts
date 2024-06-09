import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { ResponseMessage } from '../../../common/decorators/response.decorator';
import {
  ForgotPasswordDto,
  LoginDto,
  RequestVerifyEmailOtpDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './dto/auth.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { RESPONSE_CONSTANT } from '../../../common/constants/response.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.REGISTER_SUCCESS)
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }

  @Public()
  @Post('login')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.LOGIN_SUCCESS)
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }

  @Public()
  @Post('verify-email/otp')
  async sendVerificationEmail(@Body() payload: RequestVerifyEmailOtpDto) {
    return await this.authService.sendVerificationMail(payload);
  }

  @Public()
  @Post('verify-email')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.EMAIL_VERIFICATION_SUCCESS)
  async verifyEmail(@Body() payload: VerifyEmailDto) {
    return await this.authService.verifyEmail(payload);
  }

  @Public()
  @Post('forgot-password')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.PASSWORD_RESET_EMAIL_SUCCESS)
  async sendPasswordResetEmail(@Body() payload: ForgotPasswordDto) {
    return await this.authService.sendPasswordResetEmail(payload);
  }

  @Public()
  @Post('forgot-password/update')
  @ResponseMessage(RESPONSE_CONSTANT.AUTH.PASSWORD_RESET_SUCCESS)
  async resetPassword(@Body() payload: ResetPasswordDto) {
    return await this.authService.resetPassword(payload);
  }
}
