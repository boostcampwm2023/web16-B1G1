import { JwtModuleOptions } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';
configDotenv();

const jwtConfig: JwtModuleOptions = {
	secret: process.env.JWT_SECRET,
	signOptions: {
		expiresIn: 3600,
	},
};

export { jwtConfig };
