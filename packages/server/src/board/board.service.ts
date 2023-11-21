import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { unlinkSync } from 'fs';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class BoardService {
	constructor(
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>,
		@InjectRepository(Image)
		private readonly imageRepository: Repository<Image>,
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

	async uploadFile(board_id: number, file: CreateImageDto): Promise<Board> {
		// 이미지 파일인지 확인
		if (!file.mimetype.includes('image')) {
			unlinkSync(file.path); // 파일 삭제
			throw new BadRequestException('Only image files are allowed');
		}

		const board = await this.findBoardById(board_id);

		// 게시글 존재 여부 확인
		if (!board) {
			unlinkSync(file.path); // 파일 삭제
			throw new NotFoundException(`Not found board with id: ${board_id}`);
		}

		// 파일이 정상적으로 업로드 되었는지 확인
		if (!file.path) {
			throw new InternalServerErrorException('No file uploaded');
		}

		// 이미 파일이 존재하는지 확인
		if (board.image_id) {
			unlinkSync(file.path); // 파일 삭제
		}

		const { mimetype, filename, path, size } = file;
		const image = this.imageRepository.create({
			mimetype,
			filename,
			path,
			size,
		});
		const updatedImage = await this.imageRepository.save(image);

		board.image_id = updatedImage.id;
		const updatedBoard = await this.boardRepository.save(board);

		return updatedBoard;
	}
}
