import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ProjectService } from 'src/module/v1/project/project.service';
import { CrateRatingDto, UpdateRatingDto } from 'src/module/v1/rating/dto/rating.dto';
import { Rating, RatingDocument } from 'src/module/v1/rating/schema/rating.schema';
import { PaginationDto } from 'src/module/v1/repository/dto/repository.dto';
import { RepositoryService } from 'src/module/v1/repository/repository.service';
import { UserDocument } from 'src/module/v1/user/schemas/user.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
    private repositoryService: RepositoryService,
    private projectService: ProjectService,
  ) {}

  async create(user: UserDocument, payload: CrateRatingDto) {
    const { projectId, rating, comment } = payload;
    const project = await this.projectService.getProjectById(projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const ratingData = await this.ratingModel.create({
      user: user._id,
      project: project._id,
      rating,
      comment,
    });

    if (!ratingData) {
      throw new NotFoundException('Unable to rate project, please try again');
    }

    const averageRating = await this.getAverageRating(projectId);
    if (averageRating > 0) {
      await this.projectService.updateQuery({ _id: project._id }, { averageRating });
    }

    return ratingData;
  }

  async getAverageRating(projectId: string) {
    const averageRating = await this.ratingModel.aggregate([
      {
        $match: {
          project: new mongoose.Types.ObjectId(projectId),
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: '$project',
          averageRating: { $avg: '$rating' },
        },
      },
      {
        $project: {
          _id: 0,
          averageRating: 1,
        },
      },
    ]);

    return averageRating[0]?.averageRating || 0;
  }

  async updateRating(user: UserDocument, payload: UpdateRatingDto) {
    const { ratingId } = payload;

    const updateRating = await this.ratingModel.findOneAndUpdate(
      {
        _id: ratingId,
        user: user._id,
      },
      {
        ...payload,
      },
      { new: true },
    );

    if (!updateRating) {
      throw new NotFoundException('Rating not found');
    }

    return updateRating;
  }

  async getRatingByProject(projectId: string, query: PaginationDto) {
    const [averageRating, rating] = await Promise.all([
      this.getAverageRating(projectId),
      this.repositoryService.paginate(this.ratingModel, query, { project: projectId }, 'user project'),
    ]);

    return {
      rating,
      averageRating,
    };
  }

  async deleteRating(ratingId: string, user: UserDocument) {
    const deletedRating = await this.ratingModel.findOneAndUpdate(
      {
        _id: ratingId,
        user: user._id,
      },
      {
        isDeleted: true,
      },
    );

    if (!deletedRating) {
      throw new NotFoundException('Rating not found');
    }

    // update project average rating
    const project = await this.projectService.getProjectById(deletedRating.project);
    if (project) {
      const averageRating = await this.getAverageRating(deletedRating.project);
      await this.projectService.updateQuery({ _id: project._id }, { averageRating });
    }
  }

  async getRatingById(id: string) {
    return await this.ratingModel.findById(id).populate('user project');
  }
}
