import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Board } from '../board/entities/board.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
	Exception,
	ExceptionSchema,
} from '../exception-filter/exception.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register(jwtConfig),
		TypeOrmModule.forFeature([User, Board]),
		MongooseModule.forFeature([
			{ name: Exception.name, schema: ExceptionSchema },
		]),
	],
	controllers: [AdminController],
	providers: [AdminService, JwtStrategy],
})
export class AdminModule {}
