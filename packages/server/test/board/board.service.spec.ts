import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from '../../src/board/board.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../src/auth/entities/user.entity';
import { Board } from '../../src/board/entities/board.entity';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Star } from '../../src/star/schemas/star.schema';
import { getModelToken } from '@nestjs/mongoose';
import {
	BadRequestException,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { FileService } from '../../src/board/file.service';
import { UserDataDto } from 'src/auth/dto/user-data.dto';

describe('BoardService', () => {
	let boardService: BoardService;
	let fileService: FileService;
	let dataSource: jest.Mocked<DataSource>;
	let userRepository: Repository<User>;
	let boardRepository: Repository<Board>;
	let starModel: Model<Star>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BoardService,
				FileService,
				{
					provide: DataSource,
					useValue: {
						transaction: jest.fn(),
						manager: {
							findOneBy: jest.fn(),
							delete: jest.fn(),
						},
					},
				},
				{
					provide: getRepositoryToken(User),
					useClass: Repository,
				},
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

		boardService = module.get<BoardService>(BoardService);
		fileService = module.get<FileService>(FileService);
		userRepository = module.get<Repository<User>>(getRepositoryToken(User));
		boardRepository = module.get<Repository<Board>>(getRepositoryToken(Board));
		starModel = module.get<Model<Star>>(getModelToken(Star.name));
		dataSource = module.get(DataSource);
	});

	it('should be defined', () => {
		expect(boardService).toBeDefined();
	});

	describe('getIsLiked', () => {
		it('should return NotFoundException with not existed board', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue(undefined);

			await expect(boardService.getIsLiked(1, userData)).rejects.toThrow(
				'board not found',
			);
			await expect(boardService.getIsLiked(1, userData)).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should return true if already liked', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			const boardData: Board = new Board();
			boardData.likes = [{ id: 1 } as any];

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue(boardData);

			await expect(boardService.getIsLiked(1, userData)).resolves.toBe(true);
		});

		it('should return false if not liked', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			const boardData: Board = new Board();
			boardData.likes = [];

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue(boardData);

			await expect(boardService.getIsLiked(1, userData)).resolves.toBe(false);
		});
	});

	describe('patchLike', () => {
		it('should return NotFoundException with not existed board', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue(undefined);

			await expect(boardService.patchLike(1, userData)).rejects.toThrow(
				'board not found',
			);
			await expect(boardService.patchLike(1, userData)).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should return BadRequestException with already liked', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			const boardData: Board = new Board();
			boardData.likes = [{ id: 1 } as any];

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue(boardData);

			await expect(boardService.patchLike(1, userData)).rejects.toThrow(
				'already liked',
			);
			await expect(boardService.patchLike(1, userData)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should return NotFoundException with not existed user', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest
				.spyOn(boardRepository, 'findOneBy')
				.mockResolvedValue({ likes: [] } as any);

			jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

			await expect(boardService.patchLike(1, userData)).rejects.toThrow(
				'user not found',
			);
			await expect(boardService.patchLike(1, userData)).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('patchUnlike', () => {
		it('should return NotFoundException with not existed board', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue(undefined);

			await expect(boardService.patchUnlike(1, userData)).rejects.toThrow(
				'board not found',
			);
			await expect(boardService.patchUnlike(1, userData)).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should return BadRequestException with not liked', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			const boardData: Board = new Board();
			boardData.likes = [];

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue(boardData);

			await expect(boardService.patchUnlike(1, userData)).rejects.toThrow(
				'not liked',
			);
			await expect(boardService.patchUnlike(1, userData)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should return NotFoundException with not existed user', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			const boardData: Board = new Board();
			boardData.likes = [{ id: 1 } as any];

			jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue(boardData);

			jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

			await expect(boardService.patchUnlike(1, userData)).rejects.toThrow(
				'user not found',
			);
			await expect(boardService.patchUnlike(1, userData)).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('deleteBoard', () => {
		it('should return NotFoundException with not existed board', async () => {
			jest
				.spyOn(dataSource, 'transaction')
				.mockImplementation(async (callback: any) => {
					await callback(dataSource.manager);
				});

			jest.spyOn(dataSource.manager, 'findOneBy').mockResolvedValue(undefined);

			await expect(boardService.deleteBoard(1, {} as any)).rejects.toThrow(
				'board not found',
			);
			await expect(boardService.deleteBoard(1, {} as any)).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should return BadRequestException with not your board', async () => {
			jest
				.spyOn(dataSource, 'transaction')
				.mockImplementation(async (callback: any) => {
					await callback(dataSource.manager);
				});

			jest.spyOn(dataSource.manager, 'findOneBy').mockResolvedValue({
				user: { id: 2, username: 'username', nickname: 'nickname' },
			} as any);

			await expect(boardService.deleteBoard(1, {} as any)).rejects.toThrow(
				'not your post',
			);
			await expect(boardService.deleteBoard(1, {} as any)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should delte images', async () => {
			const userData: UserDataDto = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest
				.spyOn(dataSource, 'transaction')
				.mockImplementation(async (callback: any) => {
					await callback(dataSource.manager);
				});

			jest.spyOn(dataSource.manager, 'findOneBy').mockResolvedValue({
				user: { id: 1, username: 'username', nickname: 'nickname' },
				images: [{ id: 1, key: 'key' }],
			} as any);

			jest.spyOn(dataSource.manager, 'delete').mockResolvedValue({
				affected: 1,
			} as any);

			jest.spyOn(fileService, 'deleteFile').mockResolvedValue(undefined);

			expect(await boardService.deleteBoard(1, userData)).toMatchObject({
				affected: 1,
			} as any);
		});
	});

	describe('updateBoard', () => {
		it('should return NotFoundException with not existed board', async () => {
			jest
				.spyOn(dataSource, 'transaction')
				.mockImplementation(async (callback: any) => {
					await callback(dataSource.manager);
				});

			jest.spyOn(dataSource.manager, 'findOneBy').mockResolvedValue(undefined);

			await expect(
				boardService.updateBoard(1, {} as any, {} as any, []),
			).rejects.toThrow('board not found');
			await expect(
				boardService.updateBoard(1, {} as any, {} as any, []),
			).rejects.toThrow(NotFoundException);
		});

		it('should return BadRequestException with not your board', async () => {
			const userData = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			jest
				.spyOn(dataSource, 'transaction')
				.mockImplementation(async (callback: any) => {
					await callback(dataSource.manager);
				});

			jest.spyOn(dataSource.manager, 'findOneBy').mockResolvedValue({
				user: { id: 2, username: 'username', nickname: 'nickname' },
			} as any);

			await expect(
				boardService.updateBoard(1, {} as any, userData, []),
			).rejects.toThrow('not your post');
			await expect(
				boardService.updateBoard(1, {} as any, userData, []),
			).rejects.toThrow(BadRequestException);
		});

		it('sould throw BadRequestException when request to update star', async () => {
			const userData = {
				userId: 1,
				nickname: 'nickname',
				username: 'username',
				status: 'public',
			};

			const board = new Board();
			board.user = { id: 1, username: 'username', nickname: 'nickname' } as any;
			board.star = 'star_id';

			jest
				.spyOn(dataSource, 'transaction')
				.mockImplementation(async (callback: any) => {
					await callback(dataSource.manager);
				});

			jest.spyOn(dataSource.manager, 'findOneBy').mockResolvedValue(board);

			await expect(
				boardService.updateBoard(1, { star: { a: 'b' } } as any, userData, []),
			).rejects.toThrow('cannot update star');
			await expect(
				boardService.updateBoard(1, { star: { a: 'b' } } as any, userData, []),
			).rejects.toThrow(BadRequestException);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
});
