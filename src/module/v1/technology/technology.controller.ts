import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { CreateTechnologyDto, UpdateTechnologyDto } from 'src/module/v1/technology/dto/technology.dto';

// TODO : make creation and update for admin only
@Controller('technology')
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @Post()
  async create(@Body() payload: CreateTechnologyDto) {
    return await this.technologyService.create(payload);
  }

  @Patch()
  async update(@Body() payload: UpdateTechnologyDto) {
    return await this.technologyService.update(payload);
  }

  @Get()
  async findAll() {
    return await this.technologyService.findAll();
  }

  @Get(':name')
  async searchByName(@Param('name') name: string) {
    return await this.technologyService.searchByName(name);
  }
}
