import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RatingService } from './rating.service';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { UserDocument } from 'src/module/v1/user/schemas/user.schema';
import { CrateRatingDto, UpdateRatingDto } from 'src/module/v1/rating/dto/rating.dto';
import { PaginationDto } from 'src/module/v1/repository/dto/repository.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() payload: CrateRatingDto, @LoggedInUserDecorator() user: UserDocument) {
    return await this.ratingService.create(user, payload);
  }

  @Patch()
  async update(@Body() payload: UpdateRatingDto, @LoggedInUserDecorator() user: UserDocument) {
    return await this.ratingService.updateRating(user, payload);
  }

  @Get('project/:projectId')
  async getRatingByProject(@Param('projectId') projectId: string, @Query() query: PaginationDto) {
    return await this.ratingService.getRatingByProject(projectId, query);
  }

  @Get(':id')
  async getRatingById(@Param('id') id: string) {
    return await this.ratingService.getRatingById(id);
  }

  @Delete(':ratingId')
  async deleteRating(@Param('ratingId') ratingId: string, @LoggedInUserDecorator() user: UserDocument) {
    return await this.ratingService.deleteRating(ratingId, user);
  }
}
