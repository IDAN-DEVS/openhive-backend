import { Body, Controller, Get, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from 'src/module/v1/project/dto/project.dto';
import { LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDocument } from 'src/module/v1/user/schemas/user.schema';
import { PaginationDto } from 'src/module/v1/repository/dto/repository.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createProject(
    @Body() payload: CreateProjectDto,
    @LoggedInUserDecorator() user: UserDocument,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.projectService.create(payload, user, image);
  }

  @Public()
  @Get('all')
  async getAllProjects(@Query() query: PaginationDto) {
    return await this.projectService.getAllProjects(query);
  }

  @Get('my-projects')
  async getMyProjects(@LoggedInUserDecorator() user: UserDocument, @Query() query: PaginationDto) {
    return await this.projectService.getMyProjects(user, query);
  }

  @Public()
  @Get(':projectId')
  async getProjectById(@Query('projectId') id: string) {
    return await this.projectService.getProjectById(id);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch()
  async updateProject(
    @Body() payload: UpdateProjectDto,
    @LoggedInUserDecorator() user: UserDocument,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.projectService.updateProject(user, payload, image);
  }
}
