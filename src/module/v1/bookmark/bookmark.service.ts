import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bookmark, BookmarkDocument } from './schema/bookmark.schema';
import { Model } from 'mongoose';
import { CreateBookmarkDto } from './dto/bookmark.dto';
import { UserDocument } from '../user/schemas/user.schema';
import { RepositoryService } from '../repository/repository.service';
import { PaginationDto } from '../repository/dto/repository.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
    private repositoryService: RepositoryService,
  ) {}

  async create(user: UserDocument, payload: CreateBookmarkDto) {
    const { projectId } = payload;

    return this.bookmarkModel.findOneAndUpdate(
      {
        user: user._id,
        project: projectId,
      },
      {
        user: user._id,
        project: projectId,
      },
      {
        upsert: true,
        new: true,
      },
    );
  }

  async getUserBookmarks(user: UserDocument, query: PaginationDto) {
    return await this.repositoryService.paginate(this.bookmarkModel, query, { user: user._id }, 'project user');
  }

  async delete(user: UserDocument, bookmarkId: string) {
    this.bookmarkModel.deleteOne({
      user: user._id,
      _id: bookmarkId,
    });
  }
}
