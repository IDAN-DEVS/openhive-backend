import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';

@Module({
  imports: [],
  controllers: [SeederController],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
