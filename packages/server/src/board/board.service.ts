import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
	constructor(
		@InjectRepository(Board)
		private boardRepository: Repository<Board>,
	) {}

	async create(createBoardDto: CreateBoardDto): Promise<Board> {
		const { title, content, author } = createBoardDto;

		const board = this.boardRepository.create({
			title,
			content,
			author,
		});
		const created: Board = await this.boardRepository.save(board);

		return created;
	}

	findAll() {
		return `This action returns all board`;
	}

	async findBoardById(id: number): Promise<Board> {
		const found: Board = await this.boardRepository.findOneBy({ id });
		if (!found) {
			throw new NotFoundException(`Not found board with id: ${id}`);
		}
		return found;
	}

	update(id: number, updateBoardDto: UpdateBoardDto) {
		return `This action updates a #${id} board`;
	}

	remove(id: number) {
		return `This action removes a #${id} board`;
	}
}
