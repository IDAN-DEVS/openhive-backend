import {
  BadRequestException,
  ConflictException,
  Injectable,
  Inject,
  forwardRef,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RequestVerifyEmailOtpDto,
  ResetPasswordDto,
  VerifyEmailDto,
} from './dto/auth.dto';
import { BaseHelper } from '../../../common/utils/helper.util';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from '../otp/otp.service';
import { OtpTypeEnum } from 'src/common/enums/otp.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => OtpService))
    private readonly otpService: OtpService,
  ) {}

  async register(payload: CreateUserDto) {
    const user = await this.userService.createUser(payload);

    await this.otpService.sendOTP({
      email: user.email,
      type: OtpTypeEnum.VERIFY_EMAIL,
    });

    return user;
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;

    const user = await this.userService.getUserByEmailIncludePassword(email);

    if (!user) {
      throw new BadRequestException('Invalid Credential');
    }

    const passwordMatch = await BaseHelper.compareHashedData(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Incorrect Password');
    }

    if (!user.emailVerified) {
      throw new BadRequestException('kindly verify your email to login');
    }

    const token = this.jwtService.sign({ _id: user._id });
    delete user['_doc'].password;
    return {
      ...user['_doc'],
      accessToken: token,
    };
  }

  async verifyEmail(payload: VerifyEmailDto) {
    const { code, email } = payload;

    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid Email');
    }

    if (user.emailVerified) {
      throw new UnprocessableEntityException('Email already verified');
    }

    await this.otpService.verifyOTP({
      code,
      email,
      type: OtpTypeEnum.VERIFY_EMAIL,
    });

    await this.userService.updateUserByEmail(email, {
      emailVerified: true,
    });
  }

  async sendVerificationMail(payload: RequestVerifyEmailOtpDto) {
    await this.userService.checkUserExistByEmail(payload.email);

    await this.otpService.sendOTP({
      ...payload,
      type: OtpTypeEnum.VERIFY_EMAIL,
    });
  }

  async sendPasswordResetEmail(payload: ForgotPasswordDto) {
    await this.userService.checkUserExistByEmail(payload.email);

    await this.otpService.sendOTP({
      ...payload,
      type: OtpTypeEnum.RESET_PASSWORD,
    });
  }

  async resetPassword(payload: ResetPasswordDto) {
    const { email, password, confirmPassword, code } = payload;

    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    await this.otpService.verifyOTP({
      email,
      code,
      type: OtpTypeEnum.RESET_PASSWORD,
    });

    const hashedPassword = await BaseHelper.hashData(password);

    await this.userService.updateUserByEmail(email, {
      password: hashedPassword,
    });
  }
}
