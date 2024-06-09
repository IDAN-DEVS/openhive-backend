export interface IWelcomeEmailTemplate {
  name: string;
}

export interface IVerifyEmailTemplate {
  code: number;
}

export type ISendResetPasswordEmailTemplate = IVerifyEmailTemplate;

export interface IMeetingResponseEmailTemplate {
  studentName: string;
  mentorName: string;
  meetingDate: string;
  response: 'accept' | 'reject';
}
