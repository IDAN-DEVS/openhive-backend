import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { BaseHelper } from './helper.util';
import { ENVIRONMENT } from '../configs/environment';

if (
  !ENVIRONMENT.CLOUDFLARE_R2.ACCESS_KEY ||
  !ENVIRONMENT.CLOUDFLARE_R2.BUCKET_NAME ||
  !ENVIRONMENT.CLOUDFLARE_R2.ACCOUNT_ID ||
  !ENVIRONMENT.CLOUDFLARE_R2.SECRET_KEY
) {
  throw new Error('Cloudflare R2 environment variables are not set');
}

// S3 client configuration
export const s3Client = new S3Client({
  endpoint: `https://${ENVIRONMENT.CLOUDFLARE_R2.ACCOUNT_ID}.r2.cloudflarestorage.com`,
  region: 'us-east-1',
  credentials: {
    accessKeyId: ENVIRONMENT.CLOUDFLARE_R2.ACCESS_KEY,
    secretAccessKey: ENVIRONMENT.CLOUDFLARE_R2.SECRET_KEY,
  },
});

export const uploadSingleFile = async (file: Express.Multer.File, folder?: string): Promise<{ url: string }> => {
  const { buffer, mimetype } = file;

  const fileName = BaseHelper.generateFileName(folder, mimetype);

  const uploadParams = {
    Bucket: ENVIRONMENT.CLOUDFLARE_R2.BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: mimetype,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    const fileUrl = `${ENVIRONMENT.CLOUDFLARE_R2.BUCKET_URL}/${fileName}`;

    return {
      url: fileUrl,
    };
  } catch (error) {
    console.log('uploadSingleFile error', error);
    return {
      url: '',
    };
  }
};
