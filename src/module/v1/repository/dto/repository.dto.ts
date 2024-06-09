import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  size?: number;
}
