import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { StarController } from './star.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Star, StarSchema } from './schemas/star.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Board]),
		AuthModule,
		MongooseModule.forFeature([{ name: Star.name, schema: StarSchema }]),
	],
	controllers: [StarController],
	providers: [StarService],
})
export class StarModule {}
