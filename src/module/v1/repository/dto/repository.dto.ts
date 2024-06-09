import { IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  size?: number;

  @IsOptional()
  sort: 'asc' | 'desc' = 'desc';
}
