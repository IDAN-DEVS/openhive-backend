import { PartialType } from '@nestjs/mapped-types';
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
  @IsMongoId({ each: true })
  technologies: string[];
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsMongoId({
    message: 'Project ID is invalid',
  })
  @IsNotEmpty()
  projectId: string;
}
