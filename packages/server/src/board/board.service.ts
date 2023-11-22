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
import { encryptAes, decryptAes } from 'src/utils/aes.util';
import { User } from 'src/auth/entities/user.entity';
import { UserDataDto } from './dto/user-data.dto';

@Injectable()
export class BoardService {
	constructor(
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>,
		@InjectRepository(Image)
		private readonly imageRepository: Repository<Image>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async createBoard(
		createBoardDto: CreateBoardDto,
		userData: UserDataDto,
	): Promise<Board> {
		const { title, content } = createBoardDto;

		const user = await this.userRepository.findOneBy({ id: userData.userId });

		const board = this.boardRepository.create({
			title,
			content: encryptAes(content), // AES 암호화하여 저장
			user,
		});
		const createdBoard: Board = await this.boardRepository.save(board);
		createdBoard.user.password = undefined; // password 제거하여 반환
		return createdBoard;
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
		if (found.content) {
			found.content = decryptAes(found.content); // AES 복호화하여 반환
		}
		return found;
	}

	async updateBoard(
		id: number,
		updateBoardDto: UpdateBoardDto,
		userData: UserDataDto,
	) {
		const board: Board = await this.findBoardById(id);

		// 게시글 작성자와 수정 요청자가 다른 경우
		if (board.user.id !== userData.userId) {
			throw new BadRequestException('You are not the author of this post');
		}

		// updateBoardDto.content가 존재하면 AES 암호화하여 저장
		if (updateBoardDto.content) {
			updateBoardDto.content = encryptAes(updateBoardDto.content);
		}

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

	async deleteBoard(id: number, userData: UserDataDto): Promise<void> {
		const board: Board = await this.findBoardById(id);

		// 게시글 작성자와 삭제 요청자가 다른 경우
		if (board.user.id !== userData.userId) {
			throw new BadRequestException('You are not the author of this post');
		}

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
		if (board.image) {
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

		board.image = updatedImage.id;
		const updatedBoard = await this.boardRepository.save(board);

		return updatedBoard;
	}
}
