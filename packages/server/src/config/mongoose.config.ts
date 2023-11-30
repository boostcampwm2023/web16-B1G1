import { configDotenv } from 'dotenv';
configDotenv();

const mongooseConfig = {
	uri: process.env.MONGO_URI,
};

export { mongooseConfig };
