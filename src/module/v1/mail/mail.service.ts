import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { ENVIRONMENT } from 'src/common/configs/environment';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendEmail(toEmail: string, subject: string, template: string) {
    try {
      await this.mailerService.sendMail({
        from: `No Reply <${ENVIRONMENT.MAILER.EMAIL}>`,
        to: toEmail,
        subject: subject,
        html: template,
      });
    } catch (error) {
      console.log('sendEmail error', error);
    }
  }
}
