import { configDotenv } from 'dotenv';
configDotenv();

export const aesConfig = {
	password: process.env.AES_PASSWORD,
	salt: process.env.AES_SALT,
	iv: Buffer.alloc(16, 0),
};
