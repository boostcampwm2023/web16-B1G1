import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Image } from './entities/image.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Board, Image, User]), AuthModule],
	controllers: [BoardController],
	providers: [BoardService],
})
export class BoardModule {}
