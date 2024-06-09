import { IsEmail, IsEnum, IsNumber } from 'class-validator';
import { OtpTypeEnum } from 'src/common/enums/otp.enum';

export class CreateOtpDto {
  @IsEnum(OtpTypeEnum)
  type: OtpTypeEnum;

  @IsEmail()
  email: string;

  @IsNumber()
  code: number;
}

export class SendOtpDto {
  @IsEnum(OtpTypeEnum)
  type: OtpTypeEnum;

  @IsEmail()
  email: string;
}

export class VerifyOtpDto extends SendOtpDto {
  @IsNumber()
  code: number;
}

export class ValidateOtpDto extends VerifyOtpDto {}
