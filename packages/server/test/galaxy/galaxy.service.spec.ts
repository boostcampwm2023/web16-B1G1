import { Test, TestingModule } from '@nestjs/testing';
import { GalaxyService } from '../../src/galaxy/galaxy.service';
import { Repository } from 'typeorm';
import { User } from '../../src/auth/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getModelToken } from '@nestjs/mongoose';
import { Galaxy } from '../../src/galaxy/schemas/galaxy.schema';
import { Model } from 'mongoose';
import {
	BadRequestException,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';

describe('GalaxyService', () => {
	let service: GalaxyService;
	let userRepository: Repository<User>;
	let galaxyModel: Model<Galaxy>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GalaxyService,
				{
					provide: getRepositoryToken(User),
					useClass: Repository,
				},
				{
					provide: getModelToken(Galaxy.name),
					useValue: Model,
				},
			],
		}).compile();

		service = module.get<GalaxyService>(GalaxyService);
		userRepository = module.get<Repository<User>>(getRepositoryToken(User));
		galaxyModel = module.get<Model<Galaxy>>(getModelToken(Galaxy.name));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findGalaxyByNickname', () => {
		it('should throw BadRequestException with empty nickname', async () => {
			await expect(service.findGalaxyByNickname('')).rejects.toThrow(
				'nickname is required',
			);
			await expect(service.findGalaxyByNickname('')).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw NotFoundException with not existed user', async () => {
			jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

			await expect(service.findGalaxyByNickname('nickname')).rejects.toThrow(
				'user not found',
			);
			await expect(service.findGalaxyByNickname('nickname')).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should throw NotFoundException with not existed galaxy', async () => {
			jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(new User());

			jest.spyOn(galaxyModel, 'findOne').mockResolvedValue(undefined);

			await expect(service.findGalaxyByNickname('nickname')).rejects.toThrow(
				'galaxy not found',
			);
			await expect(service.findGalaxyByNickname('nickname')).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should return galaxy', async () => {
			jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(new User());

			jest.spyOn(galaxyModel, 'findOne').mockResolvedValue(new Galaxy());

			await expect(service.findGalaxyByNickname('nickname')).resolves.toEqual(
				new Galaxy(),
			);
		});
	});

	describe('updateGalaxyMine', () => {
		it('should throw NotFoundException with not existed user', async () => {
			jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

			await expect(service.updateGalaxyMine({}, { userId: 1 })).rejects.toThrow(
				'user not found',
			);
			await expect(service.updateGalaxyMine({}, { userId: 1 })).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should throw InternalServerErrorException with update failed', async () => {
			jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(new User());

			jest.spyOn(galaxyModel, 'updateOne').mockResolvedValue(undefined);

			await expect(service.updateGalaxyMine({}, { userId: 1 })).rejects.toThrow(
				'galaxy update failed',
			);
			await expect(service.updateGalaxyMine({}, { userId: 1 })).rejects.toThrow(
				InternalServerErrorException,
			);
		});

		it('should throw NotFoundException with not existed galaxy', async () => {
			jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(new User());

			jest.spyOn(galaxyModel, 'updateOne').mockResolvedValue({
				acknowledged: true,
				matchedCount: 0,
				upsertedId: null,
				upsertedCount: 0,
				modifiedCount: 0,
			});

			await expect(service.updateGalaxyMine({}, { userId: 1 })).rejects.toThrow(
				'galaxy not found',
			);
			await expect(service.updateGalaxyMine({}, { userId: 1 })).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should throw BadRequestException with nothing to update', async () => {
			jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(new User());

			jest.spyOn(galaxyModel, 'updateOne').mockResolvedValue({
				acknowledged: true,
				matchedCount: 1,
				upsertedId: null,
				upsertedCount: 0,
				modifiedCount: 0,
			});

			await expect(service.updateGalaxyMine({}, { userId: 1 })).rejects.toThrow(
				'nothing to update',
			);
			await expect(service.updateGalaxyMine({}, { userId: 1 })).rejects.toThrow(
				BadRequestException,
			);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
});
