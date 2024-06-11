import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/bookmark.dto';
import { LoggedInUserDecorator } from '../../../common/decorators/logged_in_user.decorator';
import { UserDocument } from '../user/schemas/user.schema';
import { PaginationDto } from '../repository/dto/repository.dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  async create(@Body() payload: CreateBookmarkDto, @LoggedInUserDecorator() user: UserDocument) {
    return await this.bookmarkService.create(user, payload);
  }

  @Get('user')
  async getUserBookmarks(@LoggedInUserDecorator() user: UserDocument, @Query() query: PaginationDto) {
    return await this.bookmarkService.getUserBookmarks(user, query);
  }

  @Delete(':bookmarkId')
  async delete(@LoggedInUserDecorator() user: UserDocument, @Param('bookmarkId') bookmarkId: string) {
    return await this.bookmarkService.delete(user, bookmarkId);
  }
}
