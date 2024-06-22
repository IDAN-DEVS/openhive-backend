import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  projectUrl: string;

  @IsOptional()
  @Type(() => String)
  technologies: string[];
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsMongoId({
    message: 'Project ID is invalid',
  })
  @IsNotEmpty()
  projectId: string;
}
