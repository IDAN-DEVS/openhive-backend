import type { IEnvironment } from '@/common/interfaces';
import Joi from 'joi';

export const ENVIRONMENT: IEnvironment = {
	APP: {
		NAME: process.env.APP_NAME,
		PORT: parseInt(process.env.PORT || process.env.APP_PORT || '3000'),
		ENV: process.env.NODE_ENV,
		CLIENT: process.env.FRONTEND_URL!,
	},
	DB: {
		URL: process.env.DB_URL!,
	},
	JWT: {
		SECRET: process.env.JWT_SECRET!,
		SECRET_EXPIRES_IN: process.env.JWT_SECRET_EXPIRES_IN!,
	},
	FRONTEND_URL: process.env.FRONTEND_URL!,
};

// validate environment variables
const schema = Joi.object({
	APP_NAME: Joi.string().required(),
	PORT: Joi.number().default(3000),
	APP_PORT: Joi.number(), // Optional, as PORT is already providing a default
	NODE_ENV: Joi.string().valid('development', 'production', 'staging').required(),
	FRONTEND_URL: Joi.string().uri().required(),
	DB_URL: Joi.string().required(),
	JWT_SECRET: Joi.string().required(),
	JWT_SECRET_EXPIRES_IN: Joi.string().required(),
}).unknown(true);

const { error } = schema.validate(process.env);

if (error) {
	throw new Error(`Environment variable validation error: ${error.message}`);
}
