import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ENVIRONMENT } from 'src/common/configs/environment';
import { join } from 'path';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: ENVIRONMENT.MAILER.HOST,
        port: +ENVIRONMENT.MAILER.PORT,
        auth: {
          user: ENVIRONMENT.MAILER.USERNAME,
          pass: ENVIRONMENT.MAILER.PASSWORD,
        },
      },
      defaults: {
        from: `${ENVIRONMENT.MAILER.EMAIL}`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
