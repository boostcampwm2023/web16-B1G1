import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
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

	async findAllBoards(): Promise<Board[]> {
		const boards = await this.boardRepository.find();
		return boards;
	}

	async findAllBoardsByAuthor(author: string): Promise<Board[]> {
		const boards = await this.boardRepository.findBy({ author });
		return boards;
	}

	async findBoardById(id: number): Promise<Board> {
		const found: Board = await this.boardRepository.findOneBy({ id });
		if (!found) {
			throw new NotFoundException(`Not found board with id: ${id}`);
		}
		return found;
	}

	async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
		const board: Board = await this.findBoardById(id);

		const updatedBoard: Board = await this.boardRepository.save({
			...board,
			...updateBoardDto,
		});
		return updatedBoard;
	}

	async patchLike(id: number): Promise<Partial<Board>> {
		const board = await this.findBoardById(id);
		board.like_cnt += 1;
		await this.boardRepository.save(board);
		return { like_cnt: board.like_cnt };
	}

	async patchUnlike(id: number): Promise<Partial<Board>> {
		const board = await this.findBoardById(id);
		board.like_cnt -= 1;
		await this.boardRepository.save(board);
		return { like_cnt: board.like_cnt };
	}

	async deleteBoard(id: number): Promise<void> {
		const result = await this.boardRepository.delete({ id });
	}
}
