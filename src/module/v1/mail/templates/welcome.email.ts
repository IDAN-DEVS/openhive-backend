import { MailTemplateConstant } from 'src/module/v1/mail/config';
import { IWelcomeEmailTemplate } from '../../../../common/interfaces/email-templates.interface';

export function welcomeEmailTemplate(data: IWelcomeEmailTemplate) {
  return `
    <!DOCTYPE html>
<html>
<head>
  <title>Welcome Email</title>
</head>
<body>
  <h1>Welcome, ${data.name}!</h1>
  <p>Thank you for joining our platform. We are excited to have you on board.</p>
  <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
  <p>Best regards,</p>
  <p>${MailTemplateConstant.appName}</p>
</body>
</html>
    `;
}
