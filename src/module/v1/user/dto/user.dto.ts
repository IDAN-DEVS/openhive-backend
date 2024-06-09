import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoleEnum } from 'src/common/enums/user.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(10, 11)
  phone: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(600)
  bio?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  deleteProfilePhoto?: boolean;

  @IsOptional()
  @IsMongoId()
  school?: string;

  @IsOptional()
  @IsMongoId()
  course?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  preferredLanguages: string[];
}

export class GetUserProfileDto {}
