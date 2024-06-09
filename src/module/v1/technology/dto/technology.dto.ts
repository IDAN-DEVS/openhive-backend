import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  iconUrl: string;
}

export class UpdateTechnologyDto extends PartialType(CreateTechnologyDto) {
  @IsNotEmpty()
  @IsMongoId({
    message: 'Technology ID is invalid',
  })
  technologyId: string;
}
