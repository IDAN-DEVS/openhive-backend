import { Controller } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { Public } from '../../../common/decorators/public.decorator';

@Public()
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}
}
