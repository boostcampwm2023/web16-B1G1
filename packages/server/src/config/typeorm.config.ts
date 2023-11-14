import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
configDotenv();

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: process.env.DB_TYPE as any,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: true,
};
