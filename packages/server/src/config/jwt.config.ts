import { JwtModuleOptions } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';
import { JwtEnum } from '../auth/enums/jwt.enum';
configDotenv();

const jwtConfig: JwtModuleOptions = {
	secret: process.env.JWT_SECRET,
	signOptions: {
		expiresIn: JwtEnum.ACCESS_TOKEN_EXPIRES_IN,
	},
};

export { jwtConfig };
