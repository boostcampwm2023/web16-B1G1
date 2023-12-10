import { Test, TestingModule } from '@nestjs/testing';
import { StarService } from '../../src/star/star.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Star } from '../../src/star/schemas/star.schema';
import { Board } from '../../src/board/entities/board.entity';
import { getModelToken } from '@nestjs/mongoose';
import {
	BadRequestException,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';

describe('StarService', () => {
	let service: StarService;
	let boardRepository: Repository<Board>;
	let starModel: Model<Star>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StarService,
				{
					provide: getRepositoryToken(Board),
					useClass: Repository,
				},
				{
					provide: getModelToken(Star.name),
					useValue: Model,
				},
			],
		}).compile();

		service = module.get<StarService>(StarService);
		boardRepository = module.get<Repository<Board>>(getRepositoryToken(Board));
		starModel = module.get<Model<Star>>(getModelToken(Star.name));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findAllStarsByAuthor', () => {
		it('should throw BadRequestException with empty author', async () => {
			await expect(service.findAllStarsByAuthor('')).rejects.toThrow(
				'author is required',
			);
			await expect(service.findAllStarsByAuthor('')).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should return starDataList', async () => {
			const createQueryBuilder: any = {
				select: jest.fn().mockReturnThis(),
				from: jest.fn().mockReturnThis(),
				leftJoin: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
				getMany: jest
					.fn()
					.mockResolvedValue([{ id: 1, star: 1, title: 'title' }]),
			};

			jest
				.spyOn(boardRepository, 'createQueryBuilder')
				.mockImplementation(() => createQueryBuilder);

			jest
				.spyOn(starModel, 'findOne')
				.mockResolvedValue({ _id: 1, position: { x: 1, y: 1, z: 1 } });

			await expect(service.findAllStarsByAuthor('author')).resolves.toEqual([
				{
					id: 1,
					star: { _id: 1, position: { x: 1, y: 1, z: 1 } },
					title: 'title',
				},
			]);
		});

		it('should throw NotFoundException with not existed star', async () => {
			const createQueryBuilder: any = {
				select: jest.fn().mockReturnThis(),
				from: jest.fn().mockReturnThis(),
				leftJoin: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue([{ id: 1, star: undefined }]),
			};

			jest
				.spyOn(boardRepository, 'createQueryBuilder')
				.mockImplementation(() => createQueryBuilder);

			await expect(service.findAllStarsByAuthor('author')).rejects.toThrow(
				'no star id',
			);
			await expect(service.findAllStarsByAuthor('author')).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should return NotFoundException with not existed star', async () => {
			const createQueryBuilder: any = {
				select: jest.fn().mockReturnThis(),
				from: jest.fn().mockReturnThis(),
				leftJoin: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockResolvedValue([{ id: 1, star: 1 }]),
			};

			jest
				.spyOn(boardRepository, 'createQueryBuilder')
				.mockImplementation(() => createQueryBuilder);

			jest.spyOn(starModel, 'findOne').mockResolvedValue(undefined);

			await expect(service.findAllStarsByAuthor('author')).rejects.toThrow(
				'star not found',
			);
			await expect(service.findAllStarsByAuthor('author')).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('updateStarByPostId', () => {
		it('should throw NotFoundException with not existed board', async () => {
			const post_id = 1;
			const updateStarDto = { position: { x: 1, y: 1, z: 1 } };
			const userData = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue(undefined);

			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow('post not found');
			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow(NotFoundException);
		});

		it('should throw BadRequestException with not your star', async () => {
			const post_id = 1;
			const updateStarDto = { position: { x: 1, y: 1, z: 1 } };
			const userData = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
				user: { id: 2, username: 'username', nickname: 'nickname' },
			} as any);

			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow('not your star');
			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow(BadRequestException);
		});

		it('should throw BadRequestException with not existed star', async () => {
			const post_id = 1;
			const updateStarDto = { position: { x: 1, y: 1, z: 1 } };
			const userData = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
				user: { id: 1, username: 'username', nickname: 'nickname' },
				star: undefined,
			} as any);

			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow('star not found');
			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow(BadRequestException);
		});

		it('should return InternalServerError when update star failed', async () => {
			const post_id = 1;
			const updateStarDto = { position: { x: 1, y: 1, z: 1 } };
			const userData = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
				user: { id: 1, username: 'username', nickname: 'nickname' },
				star: 1,
			} as any);

			jest.spyOn(starModel, 'updateOne').mockResolvedValue(undefined);

			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow('update star failed');
			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow(InternalServerErrorException);
		});

		it('should return NotFoundException when star not found', async () => {
			const post_id = 1;
			const updateStarDto = { position: { x: 1, y: 1, z: 1 } };
			const userData = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
				user: { id: 1, username: 'username', nickname: 'nickname' },
				star: 1,
			} as any);

			jest.spyOn(starModel, 'updateOne').mockResolvedValue({
				matchedCount: 0,
			} as any);

			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow('star not found');
			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow(NotFoundException);
		});

		it('should return BadRequestException when nothing to update', async () => {
			const post_id = 1;
			const updateStarDto = { position: { x: 1, y: 1, z: 1 } };
			const userData = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
				user: { id: 1, username: 'username', nickname: 'nickname' },
				star: 1,
			} as any);

			jest.spyOn(starModel, 'updateOne').mockResolvedValue({
				matchedCount: 1,
				modifiedCount: 0,
			} as any);

			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow('nothing to update');
			await expect(
				service.updateStarByPostId(post_id, updateStarDto, userData),
			).rejects.toThrow(BadRequestException);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
});
