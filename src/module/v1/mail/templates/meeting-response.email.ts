import { MailTemplateConstant } from 'src/module/v1/mail/config';
import { IMeetingResponseEmailTemplate } from '../../../../common/interfaces/email-templates.interface';

export function meetingResponseEmailTemplate(data: IMeetingResponseEmailTemplate) {
  return `
    <!DOCTYPE html>
<html>
<head>
  <title>Meeting Request Response</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    .header {
      color: #2c3e50;
      margin-bottom: 20px;
    }
    .content {
      margin-bottom: 20px;
    }
    .footer {
      color: #95a5a6;
    }
  </style>
</head>
<body>
  <h1 class="header">Hello, ${data.studentName}!</h1>
  <div class="content">
    <p>Your meeting request with ${data.mentorName} scheduled for ${data.meetingDate} has been ${data.response}.</p>
    ${
      data.response === 'accept'
        ? `<p>We are looking forward to your meeting.</p>`
        : `<p>We are sorry for any inconvenience. Please feel free to reschedule.</p>`
    }
    <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
  </div>
  <div class="footer">
    <p>Best regards,</p>
    <p>${MailTemplateConstant.appName}</p>
  </div>
</body>
</html>
    `;
}
