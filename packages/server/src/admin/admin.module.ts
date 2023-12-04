import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Board])],
	controllers: [AdminController],
	providers: [AdminService],
})
export class AdminModule {}
