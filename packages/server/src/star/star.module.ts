import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { StarController } from './star.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Star, StarSchema } from './schemas/star.schema';
import { AuthModule } from '../auth/auth.module';
import {
	Exception,
	ExceptionSchema,
} from '../exception-filter/exception.schema';

@Module({
	imports: [
		TypeOrmModule.forFeature([Board]),
		AuthModule,
		MongooseModule.forFeature([
			{ name: Star.name, schema: StarSchema },
			{ name: Exception.name, schema: ExceptionSchema },
		]),
	],
	controllers: [StarController],
	providers: [StarService],
})
export class StarModule {}
