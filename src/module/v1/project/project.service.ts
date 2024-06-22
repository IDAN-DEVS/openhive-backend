import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { uploadSingleFile } from 'src/common/utils/aws.util';
import { BaseHelper } from 'src/common/utils/helper.util';
import { CreateProjectDto, UpdateProjectDto } from 'src/module/v1/project/dto/project.dto';
import { Project, ProjectDocument } from 'src/module/v1/project/schema/project.schema';
import { PaginationDto } from 'src/module/v1/repository/dto/repository.dto';
import { RepositoryService } from 'src/module/v1/repository/repository.service';
import { UserDocument } from 'src/module/v1/user/schemas/user.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private repositoryService: RepositoryService,
  ) {}

  async create(payload: CreateProjectDto, user: UserDocument, file?: Express.Multer.File): Promise<ProjectDocument> {
    let photoUrl = null;
    if (file) {
      BaseHelper.validateFileMimeType(file.mimetype);

      const uploadRes = await uploadSingleFile(file, 'project-images');
      photoUrl = uploadRes?.url || null;
    }

    return await this.projectModel.create({
      ...payload,
      imageUrl: photoUrl,
      owner: user._id,
    });
  }

  async getAllProjects(query: PaginationDto) {
    return await this.repositoryService.paginate(this.projectModel, query, {}, 'technologies');
  }

  async getMyProjects(user: UserDocument, query: PaginationDto) {
    return await this.repositoryService.paginate(this.projectModel, query, { owner: user._id });
  }

  async getProjectById(id: string) {
    return await this.projectModel.findById(id);
  }

  async updateProject(user: UserDocument, payload: UpdateProjectDto, file?: Express.Multer.File) {
    const { projectId } = payload;

    let photoUrl = null;

    if (file) {
      BaseHelper.validateFileMimeType(file.mimetype);

      const uploadRes = await uploadSingleFile(file, 'project-images');
      photoUrl = uploadRes?.url || null;
    }

    const updatedProject = await this.projectModel.findOneAndUpdate(
      {
        _id: projectId,
        owner: user._id,
      },
      {
        ...payload,
        ...(photoUrl && { imageUrl: photoUrl }),
      },
      { new: true },
    );

    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }

    return updatedProject;
  }

  async deleteProject(id: string, user: UserDocument) {
    const deletedProject = await this.projectModel.findOneAndUpdate(
      {
        _id: id,
        owner: user._id,
      },
      {
        isDeleted: true,
      },
    );

    if (!deletedProject) {
      throw new NotFoundException('Unable to delete project. Project not found or you are not the owner.');
    }

    return deletedProject;
  }

  async updateQuery(query: FilterQuery<ProjectDocument>, updatePayload: UpdateQuery<ProjectDocument>) {
    return await this.projectModel.findOneAndUpdate(query, updatePayload, { new: true });
  }
}
