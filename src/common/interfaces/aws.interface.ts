export interface IAwsUploadFile {
  fileName: string;
  mimetype: string;
  buffer: Buffer;
  originalname: string;
}
