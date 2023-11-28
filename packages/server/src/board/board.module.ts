import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Image } from './entities/image.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Star, StarSchema } from '../star/schemas/star.schema';

@Module({
	imports: [
		TypeOrmModule.forFeature([Board, Image, User]),
		AuthModule,
		MongooseModule.forFeature([{ name: Star.name, schema: StarSchema }]),
	],
	controllers: [BoardController],
	providers: [BoardService],
})
export class BoardModule {}
