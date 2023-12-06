import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
	Exception,
	ExceptionSchema,
} from '../exception-filter/exception.schema';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Board]),
		MongooseModule.forFeature([
			{ name: Exception.name, schema: ExceptionSchema },
		]),
	],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule {}
