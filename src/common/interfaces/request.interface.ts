// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Require_id } from 'mongoose';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			// user?: Require_id<IUser>; // TODO: add user to req object
			file?: Express.Multer.File;
		}
	}
}

declare module 'express-serve-static-core' {
	export interface CookieOptions {
		partitioned?: boolean;
	}
}
