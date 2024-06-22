import { User, UserDocument } from './schemas/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BaseHelper } from '../../../common/utils/helper.util';
import { uploadSingleFile } from 'src/common/utils/aws.util';
import { Injectable } from '@nestjs/common/decorators';
import { ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common/exceptions';
import { RepositoryService } from 'src/module/v1/repository/repository.service';
import { PaginationDto } from 'src/module/v1/repository/dto/repository.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private repositoryService: RepositoryService,
  ) {}

  async createUser(payload: CreateUserDto): Promise<UserDocument> {
    try {
      const hashedPassword = await BaseHelper.hashData(payload.password);

      const result = await this.userModel.create({
        ...payload,
        password: hashedPassword,
      });

      delete result['_doc'].password;
      return result;
    } catch (e) {
      console.error('Error while creating user', e);
      if (e.code === 11000) {
        throw new ConflictException(`${Object.keys(e.keyValue)} already exists`);
      } else {
        throw new InternalServerErrorException(e.response?.message || 'Something went wrong');
      }
    }
  }

  async getUserByEmailIncludePassword(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async getUserProfile(userId: string): Promise<UserDocument> {
    return await this.userModel.findById(userId);
  }

  async getUser(userId: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: userId });
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async updateUserByEmail(email: string, details: any) {
    return this.userModel.updateOne({ email }, details);
  }

  async checkUserExistByEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('No user exist with provided email');
    }

    return true;
  }

  async updateUserProfile(userId: string, payload: UpdateUserDto, photo?: Express.Multer.File): Promise<UserDocument> {
    const { deleteProfilePhoto } = payload;

    let photoUrl = null;

    if (photo) {
      BaseHelper.validateFileMimeType(photo.mimetype);

      const uploadRes = await uploadSingleFile(photo, 'profile-photos');
      photoUrl = uploadRes?.url || null;
    }

    const updateData = { ...payload };

    if (photo && photoUrl) {
      updateData['profilePhoto'] = photoUrl;
    } else if (deleteProfilePhoto) {
      updateData['profilePhoto'] = null;
    }

    return this.userModel.findOneAndUpdate({ _id: userId }, updateData, { new: true });
  }

  async getAllUsers(query: PaginationDto) {
    return await this.repositoryService.paginate(this.userModel, query);
  }

  async update(userId: string, payload: UpdateQuery<UserDocument>): Promise<UserDocument> {
    return await this.userModel.findOneAndUpdate({ _id: userId }, payload, { new: true });
  }

  async findOneQuery(query: FilterQuery<UserDocument>): Promise<UserDocument> {
    return await this.userModel.findOne(query);
  }
}
