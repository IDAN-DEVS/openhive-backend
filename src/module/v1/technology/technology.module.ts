import { Module } from '@nestjs/common';
import { TechnologyService } from './technology.service';
import { TechnologyController } from './technology.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Technology, TechnologySchema } from 'src/module/v1/technology/schema/technology.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Technology.name, schema: TechnologySchema }])],
  controllers: [TechnologyController],
  providers: [TechnologyService],
})
export class TechnologyModule {}
