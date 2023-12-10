import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config/jwt.config';
import { RedisRepository } from './redis.repository';
import { CookieAuthGuard } from './cookie-auth.guard';
import { ShareLink } from './entities/share-link.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Galaxy, GalaxySchema } from '../galaxy/schemas/galaxy.schema';
import {
	Exception,
	ExceptionSchema,
} from '../exception-filter/exception.schema';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register(jwtConfig),
		TypeOrmModule.forFeature([User, ShareLink]),
		MongooseModule.forFeature([
			{ name: Galaxy.name, schema: GalaxySchema },
			{ name: Exception.name, schema: ExceptionSchema },
		]),
	],
	controllers: [AuthController],
	providers: [AuthService, CookieAuthGuard, RedisRepository],
	exports: [JwtModule, CookieAuthGuard, RedisRepository],
})
export class AuthModule {}
