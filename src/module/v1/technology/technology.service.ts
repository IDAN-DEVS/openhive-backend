import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTechnologyDto, UpdateTechnologyDto } from 'src/module/v1/technology/dto/technology.dto';
import { Technology, TechnologyDocument } from 'src/module/v1/technology/schema/technology.schema';

@Injectable()
export class TechnologyService {
  constructor(@InjectModel(Technology.name) private technologyModel: Model<TechnologyDocument>) {}

  async create(payload: CreateTechnologyDto): Promise<TechnologyDocument> {
    try {
      return await this.technologyModel.create(payload);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Technology already exists');
      }

      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<TechnologyDocument[]> {
    return await this.technologyModel.find().exec();
  }

  async searchByName(name: string): Promise<TechnologyDocument[]> {
    return await this.technologyModel.find({ name: { $regex: name, $options: 'i' } }).exec();
  }

  async update(payload: UpdateTechnologyDto): Promise<TechnologyDocument> {
    const { technologyId } = payload;
    return await this.technologyModel.findByIdAndUpdate(technologyId, payload, { new: true });
  }
}
