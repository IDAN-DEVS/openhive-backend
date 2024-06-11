import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from 'src/module/v1/rating/schema/rating.schema';
import { ProjectModule } from 'src/module/v1/project/project.module';
import { RepositoryModule } from 'src/module/v1/repository/repository.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rating.name,
        schema: RatingSchema,
      },
    ]),
    RepositoryModule,
    ProjectModule,
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
