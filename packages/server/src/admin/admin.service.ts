import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>,
	) {}
}
