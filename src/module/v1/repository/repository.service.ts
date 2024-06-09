import { Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/repository.dto';

@Injectable()
export class RepositoryService {
  async paginate(model: any, query?: PaginationDto, options?: any, populateFields?: any) {
    const { page = 1, size = 10 } = query;

    const skip = (page - 1) * size;

    const [data, total] = await Promise.all([
      model
        .find({
          ...options,
        })
        .skip(skip)
        .limit(size > 100 ? 100 : size)
        .populate(populateFields),
      model.countDocuments({
        ...options,
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        size,
        lastPage: Math.ceil(total / size),
      },
    };
  }
}
