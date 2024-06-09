import { UserService } from './user.service';
import { ILoggedInUser, LoggedInUserDecorator } from 'src/common/decorators/logged_in_user.decorator';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RESPONSE_CONSTANT } from 'src/common/constants/response.constant';
import { UpdateUserDto } from './dto/user.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ResponseMessage(RESPONSE_CONSTANT.USER.GET_CURRENT_USER_SUCCESS)
  @Get('/')
  async getCurrentUser(@LoggedInUserDecorator() user: ILoggedInUser) {
    return await this.userService.getUserProfile(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @ResponseMessage(RESPONSE_CONSTANT.USER.UPDATE_USER_PROFILE_SUCCESS)
  @UseInterceptors(FileInterceptor('photo'))
  @Patch('/profile')
  async updateProfile(
    @Body() payload: UpdateUserDto,
    @LoggedInUserDecorator() user: ILoggedInUser,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return await this.userService.updateUserProfile(user._id, payload, photo);
  }

  @Get(':userId')
  async getUserById(@Param('userId') id: string) {
    return await this.userService.getUserProfile(id);
  }
}
