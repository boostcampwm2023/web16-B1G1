import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../src/auth/entities/user.entity';
import { ShareLink } from '../../src/auth/entities/share-link.entity';
import { JwtService } from '@nestjs/jwt';
import { Galaxy } from '../../src/galaxy/schemas/galaxy.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { RedisRepository } from '../../src/auth/redis.repository';

describe('AuthController', () => {
	let controller: AuthController;
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				AuthService,
				{
					provide: getRepositoryToken(User),
					useClass: Repository,
				},
				{
					provide: getRepositoryToken(ShareLink),
					useClass: Repository,
				},
				RedisRepository,
				JwtService,
				{
					provide: getModelToken(Galaxy.name),
					useValue: Model,
				},
				{
					provide: getModelToken('Exception'),
					useValue: Model,
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('POST /auth/signup', async () => {
		expect(controller.signUp).toBeDefined();

		jest.spyOn(service, 'signUp').mockImplementation(async () => {
			return {
				id: 1,
				username: 'test',
				nickname: 'test',
			};
		});

		const result = await controller.signUp({
			username: 'test',
			nickname: 'test',
			password: 'test',
		});

		expect(result).toBeDefined();
		expect(result).toHaveProperty('id');
		expect(result).toHaveProperty('username');
		expect(result.username).toBe('test');
		expect(result).toHaveProperty('nickname');
		expect(result.nickname).toBe('test');
	});
});
