export interface IEnvironment {
	APP: {
		NAME: string | undefined;
		PORT: number;
		ENV: string | undefined;
		CLIENT: string;
	};
	DB: {
		URL: string;
	};
	JWT: {
		SECRET: string;
		SECRET_EXPIRES_IN: string;
	};
	FRONTEND_URL: string;
}
