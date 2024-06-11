import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CrateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  rating: number;

  @IsNotEmpty()
  @IsMongoId({ message: 'Project id is not valid' })
  projectId: string;

  @IsNotEmpty()
  @IsOptional()
  comment: string;
}

export class UpdateRatingDto extends PartialType(CrateRatingDto) {
  @IsNotEmpty()
  @IsMongoId({ message: 'Rating id is not valid' })
  ratingId: string;
}
