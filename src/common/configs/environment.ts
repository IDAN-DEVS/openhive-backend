import * as dotenv from 'dotenv';
dotenv.config();

export interface IEnvironment {
  APP: {
    NAME: string;
    PORT: number | string;
    ENV: string;
    ENCRYPTION_KEY: string;
  };
  DB: {
    URL: string;
  };
  JWT: {
    SECRET: string;
  };
  MAILER: {
    HOST: string;
    PORT: string;
    EMAIL: string;
    USERNAME: string;
    PASSWORD: string;
  };
  CLOUDFLARE_R2: {
    ACCOUNT_ID: string;
    ACCESS_KEY: string;
    SECRET_KEY: string;
    BUCKET_NAME: string;
    BUCKET_URL: string;
  };
  REDIS: {
    URL: string;
  };
}

export const ENVIRONMENT: IEnvironment = {
  APP: {
    NAME: process.env.APP_NAME,
    PORT: process.env.PORT || process.env.APP_PORT || 3000,
    ENV: process.env.APP_ENV,
    ENCRYPTION_KEY: process.env.APP_ENCRYPTION_KEY,
  },
  DB: {
    URL: process.env.DB_URL,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
  },
  MAILER: {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    EMAIL: process.env.SMTP_EMAIL,
    USERNAME: process.env.SMTP_USERNAME,
    PASSWORD: process.env.SMTP_PASSWORD,
  },
  CLOUDFLARE_R2: {
    ACCOUNT_ID: process.env.CLOUDFLARE_R2_ACCOUNT_ID,
    ACCESS_KEY: process.env.CLOUDFLARE_R2_ACCESS_KEY,
    SECRET_KEY: process.env.CLOUDFLARE_R2_SECRET_KEY,
    BUCKET_NAME: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    BUCKET_URL: process.env.CLOUDFLARE_R2_BUCKET_URL,
  },
  REDIS: {
    URL: process.env.REDIS_URL,
  },
};
