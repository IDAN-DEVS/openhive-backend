import { Module } from '@nestjs/common';
import { UserModule } from './module/v1/user/user.module';
import { DatabaseModule } from './module/v1/database/database.module';
import { AuthModule } from './module/v1/auth/auth.module';
import { OtpModule } from './module/v1/otp/otp.module';
import { MailModule } from './module/v1/mail/mail.module';
import { RepositoryModule } from './module/v1/repository/repository.module';
import { SeederModule } from './module/v1/seeder/seeder.module';
import { ProjectModule } from './module/v1/project/project.module';
import { TechnologyModule } from './module/v1/technology/technology.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    AuthModule,
    OtpModule,
    MailModule,
    RepositoryModule,
    SeederModule,
    ProjectModule,
    TechnologyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
