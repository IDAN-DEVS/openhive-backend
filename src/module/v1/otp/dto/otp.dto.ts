import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;
}

export class ValidateOtpDto extends CreateOtpDto {}
