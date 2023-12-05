import { Injectable, UseFilters, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';
import { Repository } from 'typeorm';
import { LogInterceptor } from '../interceptor/log.interceptor';
import { HttpExceptionFilter } from '../exception-filter/http.exception-filter';

@Injectable()
@UseInterceptors(LogInterceptor)
@UseFilters(HttpExceptionFilter)
export class AdminService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>,
	) {}

	async getAllPosts() {
		const posts = await this.boardRepository.find();
		return posts;
	}
}
