import { configDotenv } from 'dotenv';
configDotenv();

export const clovaConfig = {
	url: process.env.CLOVA_URL,
	api_key_id: process.env.CLOVA_API_KEY_ID,
	api_key_secret: process.env.CLOVA_API_KEY_SECRET,
};
