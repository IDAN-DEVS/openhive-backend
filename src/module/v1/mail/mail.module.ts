import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ENVIRONMENT } from 'src/common/configs/environment';

@Module({
  imports: [
    // MailerModule.forRoot({
    //   transport: {
    //     host: ENVIRONMENT.MAILER.HOST,
    //     port: +ENVIRONMENT.MAILER.PORT,
    //     auth: {
    //       user: ENVIRONMENT.MAILER.USERNAME,
    //       pass: ENVIRONMENT.MAILER.PASSWORD,
    //     },
    //   },
    //   defaults: {
    //     from: `${ENVIRONMENT.MAILER.EMAIL}`,
    //   },
    // }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: ENVIRONMENT.MAILER.USERNAME,
          pass: ENVIRONMENT.MAILER.PASSWORD,
        },
      },
      defaults: {
        from: `${ENVIRONMENT.MAILER.EMAIL}`,
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
