import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { encryptAes } from '../utils/aes.util';
import { User } from '../auth/entities/user.entity';
import { UserDataDto } from '../auth/dto/user-data.dto';
import * as AWS from 'aws-sdk';
import { awsConfig, bucketName } from '../config/aws.config';
import { v1 as uuid } from 'uuid';
import * as sharp from 'sharp';
import { InjectModel } from '@nestjs/mongoose';
import { Star } from '../star/schemas/star.schema';
import { Model, Types } from 'mongoose';
import { GetBoardByIdResDto } from './dto/get-board-by-id-res.dto';

@Injectable()
export class BoardService {
	constructor(
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>,
		@InjectRepository(Image)
		private readonly imageRepository: Repository<Image>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectModel(Star.name)
		private readonly starModel: Model<Star>,
	) {}

	async createBoard(
		createBoardDto: CreateBoardDto,
		userData: UserDataDto,
		files: Express.Multer.File[],
	): Promise<Board> {
		const { title, content, star } = createBoardDto;

		const user = await this.userRepository.findOneBy({ id: userData.userId });

		const images: Image[] = [];
		for (const file of files) {
			const image = await this.uploadFile(file);
			images.push(image);
		}

		// 별 스타일이 존재하면 MongoDB에 저장
		let star_id: string;
		if (star) {
			const starDoc = new this.starModel({
				...JSON.parse(star),
			});
			await starDoc.save();
			star_id = starDoc._id.toString();
		}

		const board = this.boardRepository.create({
			title,
			content: encryptAes(content), // AES 암호화하여 저장
			user,
			images,
			star: star_id,
		});
		const createdBoard: Board = await this.boardRepository.save(board);

		createdBoard.user.password = undefined; // password 제거하여 반환
		return createdBoard;
	}

	async findBoardById(id: number): Promise<Board> {
		// const found: Board = await this.boardRepository.findOneBy({ id });
		const found: Board = await this.boardRepository
			.createQueryBuilder()
			.select(['board.id', 'board.title', 'board.content', 'board.like_cnt'])
			.from(Board, 'board')
			.leftJoinAndMapMany(
				'board.images',
				Image,
				'image',
				'image.boardId = board.id',
			)
			.where('board.id = :id', { id })
			.getOne();

		console.log(found);

		if (!found) {
			throw new NotFoundException(`Not found board with id: ${id}`);
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

	async patchLike(id: number, userData: UserDataDto): Promise<Partial<Board>> {
		const board = await this.findBoardById(id);
		if (board.likes.find((user) => user.id === userData.userId)) {
			throw new BadRequestException('You already liked this post');
		}

		const user = await this.userRepository.findOneBy({ id: userData.userId });
		if (!user) {
			throw new NotFoundException(`Not found user with id: ${userData.userId}`);
		}

		board.likes.push(user);
		board.like_cnt = board.likes.length;

		const updatedBoard = await this.boardRepository.save(board);

		return { like_cnt: updatedBoard.like_cnt };
	}

	async patchUnlike(
		id: number,
		userData: UserDataDto,
	): Promise<Partial<Board>> {
		const board = await this.findBoardById(id);
		if (!board.likes.find((user) => user.id === userData.userId)) {
			throw new BadRequestException('You have not liked this post');
		}

		const user = await this.userRepository.findOneBy({ id: userData.userId });
		if (!user) {
			throw new NotFoundException(`Not found user with id: ${userData.userId}`);
		}

		board.likes = board.likes.filter((user) => user.id !== userData.userId);
		board.like_cnt = board.likes.length;

		const updatedBoard = await this.boardRepository.save(board);
		return { like_cnt: updatedBoard.like_cnt };
	}

	async deleteBoard(id: number, userData: UserDataDto): Promise<void> {
		const board: Board = await this.findBoardById(id);

		// 게시글 작성자와 삭제 요청자가 다른 경우
		if (board.user.id !== userData.userId) {
			throw new BadRequestException('You are not the author of this post');
		}

		const result = await this.boardRepository.delete({ id });
	}

	async uploadFile(file: Express.Multer.File): Promise<Image> {
		if (!file.mimetype.includes('image')) {
			throw new BadRequestException('Only image files are allowed');
		}

		const { mimetype, buffer, size } = file;

		const resized_buffer = await sharp(buffer)
			.resize(500, 500, { fit: 'cover' })
			.toFormat('png', { quality: 100 })
			.toBuffer();

		const filename = uuid();

		// NCP Object Storage 업로드
		AWS.config.update(awsConfig);
		const result = await new AWS.S3()
			.putObject({
				Bucket: bucketName,
				Key: filename,
				Body: resized_buffer,
				ACL: 'public-read',
			})
			.promise();
		Logger.log('uploadFile result:', result);

		const updatedImage = await this.imageRepository.save({
			mimetype,
			filename,
			size,
		});

		return updatedImage;
	}

	async downloadFile(filename: string): Promise<Buffer> {
		// NCP Object Storage 다운로드
		AWS.config.update(awsConfig);
		const result = await new AWS.S3()
			.getObject({
				Bucket: bucketName,
				Key: filename,
			})
			.promise();
		Logger.log(`downloadFile result: ${result.ETag}`);

		return result.Body as Buffer;
	}
}
