import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'Project ID is invalid' })
  projectId: string;
}
