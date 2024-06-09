import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RepositoryModule } from 'src/module/v1/repository/repository.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), RepositoryModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
