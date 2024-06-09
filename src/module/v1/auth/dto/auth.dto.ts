import { IsEmail, IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsNumber()
  code: number;
}

export class RequestVerifyEmailOtpDto {
  @IsEmail()
  email: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto extends LoginDto {
  @IsNumber()
  code: number;

  @IsString()
  confirmPassword: string;
}
