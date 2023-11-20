import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
configDotenv();

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: process.env.MYSQL_TYPE as any,
	host: process.env.MYSQL_HOST,
	port: parseInt(process.env.MYSQL_PORT),
	username: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	synchronize: true,
};
