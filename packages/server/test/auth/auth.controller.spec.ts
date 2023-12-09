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
import { UserDataDto } from '../../src/auth/dto/user-data.dto';
import {
	BadRequestException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { UserShareStatus } from '../../src/auth/enums/user.enum';

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

	it('signUp', async () => {
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

	it('signIn', async () => {
		expect(controller.signIn).toBeDefined();

		const signInUserDto = {
			username: 'test',
			password: 'test',
		};
		jest.spyOn(service, 'signIn').mockImplementation(async (signInUserDto) => {
			return { accessToken: 'token', refreshToken: 'token' };
		});

		const response = { cookie: jest.fn() } as any; // res의 cookie 메서드를 mock으로 만들어줌
		const result = await controller.signIn(signInUserDto, response);
		expect(result).toBeDefined();
		expect(result).toHaveProperty('accessToken');
		expect(result).toHaveProperty('refreshToken');
		expect(result.accessToken).toBe('token');
		expect(result.refreshToken).toBe('token');
		// response의 cookie 메소드의 호출 테스트
		expect(response.cookie.mock.calls[0][0]).toBe('accessToken'); // 첫 번째 호출의 첫 번째 인자가 'accessToken'인지 확인
		expect(response.cookie.mock.calls[0][1]).toBe('token'); // 첫 번째 호출의 두 번째 인자가 'token'인지 확인
		expect(response.cookie.mock.calls[0][2]).toBeDefined(); // 첫 번째 호출의 세 번째 인자가 정의되어 있는지 확인
		expect(response.cookie.mock.calls[1][0]).toBe('refreshToken');
		expect(response.cookie.mock.calls[1][1]).toBe('token');
		expect(response.cookie.mock.calls[1][2]).toBeDefined();
	});

	it('checkSignIn', async () => {
		expect(controller.checkSignIn).toBeDefined();
		const userData = {
			userId: 1,
		} as UserDataDto;
		jest
			.spyOn(service, 'findUserById')
			.mockImplementation(async (userId: number) => {
				return {
					id: userId,
					username: 'test',
					nickname: 'test',
				} as User;
			});

		const result = await controller.checkSignIn(userData);
		expect(result).toBeDefined();
		expect(result).toHaveProperty('id');
		expect(result).toHaveProperty('username');
		expect(result.username).toBe('test');
		expect(result).toHaveProperty('nickname');
		expect(result.nickname).toBe('test');
	});

	it('checkNickname', async () => {
		expect(controller.checkNickname).toBeDefined();
		jest
			.spyOn(service, 'checkNickname')
			.mockImplementation(async (nickname: string) => {
				return true;
			});

		const result = await controller.checkNickname('test');
		expect(result).toBeDefined();
		expect(result).toBe(true);
	});

	it('signOut', async () => {
		expect(controller.signOut).toBeDefined();
		const userData = {
			username: 'test',
		} as UserDataDto;
		jest.spyOn(service, 'signOut').mockImplementation(async (userData) => {
			return;
		});

		const response = { clearCookie: jest.fn() } as any; // res의 clearCookie 메서드를 mock으로 만들어줌
		const result = await controller.signOut(response, userData);
		expect(result).toBeDefined();
		expect(response.clearCookie.mock.calls[0][0]).toBe('accessToken');
		expect(response.clearCookie.mock.calls[0][1]).toBeDefined();
		expect(response.clearCookie.mock.calls[1][0]).toBe('refreshToken');
		expect(response.clearCookie.mock.calls[1][1]).toBeDefined();
	});

	it('isAvailableUsername', async () => {
		expect(controller.isAvailableUsername).toBeDefined();
		jest
			.spyOn(service, 'isAvailableUsername')
			.mockImplementation(async (username: string) => {
				return true;
			});

		const result = await controller.isAvailableUsername('test');
		expect(result).toBeDefined();
		expect(result).toBe(true);
	});

	it('isAvailableNickname', async () => {
		expect(controller.isAvailableNickname).toBeDefined();
		jest
			.spyOn(service, 'isAvailableNickname')
			.mockImplementation(async (nickname: string) => {
				return true;
			});

		const result = await controller.isAvailableNickname('test');
		expect(result).toBeDefined();
		expect(result).toBe(true);
	});

	it('signInWithOAuth', async () => {
		expect(controller.signInWithOAuth).toBeDefined();

		const gitHubSignInResponse = { redirect: jest.fn() } as any;
		controller.signInWithOAuth('github', gitHubSignInResponse);
		expect(gitHubSignInResponse.redirect.mock.calls[0][0]).toBe(
			`https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_GITHUB_CLIENT_ID}&scope=read:user%20user:email`,
		);

		const naverSignInResponse = { redirect: jest.fn() } as any;
		controller.signInWithOAuth('naver', naverSignInResponse);
		expect(naverSignInResponse.redirect.mock.calls[0][0]).toBe(
			`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.OAUTH_NAVER_CLIENT_ID}&redirect_uri=${process.env.OAUTH_NAVER_REDIRECT_URI}&state=STATE_STRING`,
		);

		const googleSignInResponse = { redirect: jest.fn() } as any;
		controller.signInWithOAuth('google', googleSignInResponse);
		expect(googleSignInResponse.redirect.mock.calls[0][0]).toBe(
			`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.OAUTH_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.OAUTH_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`,
		);

		const notSupportedSignInResponse = {} as any;
		try {
			controller.signInWithOAuth('notSupported', notSupportedSignInResponse);
		} catch (e) {
			expect(e).toBeInstanceOf(NotFoundException);
		}
	});

	it('oauthCallback - FirstSignIN', async () => {
		expect(controller.oauthCallback).toBeDefined();

		jest
			.spyOn(service, 'oauthCallback')
			.mockImplementation(
				async (service: string, code: string, state: string) => {
					return {
						username: 'test',
						accessToken: null,
						refreshToken: null,
					};
				},
			);

		const response = { cookie: jest.fn(), redirect: jest.fn() } as any;
		await controller.oauthCallback('testService', 'code', 'state', response);

		expect(response.cookie.mock.calls[0][0]).toBe('testServiceUsername');
		expect(response.cookie.mock.calls[0][1]).toBe('test');
		expect(response.cookie.mock.calls[0][2]).toBeDefined();
		expect(response.redirect.mock.calls[0][0]).toBe('/nickname/testService');
	});

	it('oauthCallback - NotFirstSignIN', async () => {
		expect(controller.oauthCallback).toBeDefined();

		jest
			.spyOn(service, 'oauthCallback')
			.mockImplementation(
				async (service: string, code: string, state: string) => {
					return {
						username: null,
						accessToken: 'token',
						refreshToken: 'token',
					};
				},
			);

		const response = { cookie: jest.fn(), redirect: jest.fn() } as any;
		await controller.oauthCallback('testService', 'code', 'state', response);

		expect(response.cookie.mock.calls[0][0]).toBe('accessToken');
		expect(response.cookie.mock.calls[0][1]).toBe('token');
		expect(response.cookie.mock.calls[0][2]).toBeDefined();
		expect(response.cookie.mock.calls[1][0]).toBe('refreshToken');
		expect(response.cookie.mock.calls[1][1]).toBe('token');
		expect(response.cookie.mock.calls[1][2]).toBeDefined();
		expect(response.redirect.mock.calls[0][0]).toBe('/login');
	});

	it('oauthSignUp', async () => {
		expect(controller.signUpWithOAuth).toBeDefined();

		jest
			.spyOn(service, 'signUpWithOAuth')
			.mockImplementation(
				async (
					service: string,
					nickname: string,
					resourceServerUsername: string,
				) => {
					return {} as User;
				},
			);

		try {
			await controller.signUpWithOAuth('testService', 'test', {}, {} as any);
		} catch (e) {
			expect(e).toBeInstanceOf(UnauthorizedException);
		}

		const response = { clearCookie: jest.fn(), redirect: jest.fn() } as any;
		await controller.signUpWithOAuth(
			'testService',
			'test',
			{ cookies: { testServiceUsername: 'test' } },
			response,
		);
		expect(response.clearCookie.mock.calls[0][0]).toBe('testServiceUsername');
		expect(response.clearCookie.mock.calls[0][1]).toBeDefined();
		expect(response.redirect.mock.calls[0][0]).toBe('/login');
	});

	it('searchUser', async () => {
		expect(controller.searchUser).toBeDefined();

		try {
			await controller.searchUser(undefined);
		} catch (e) {
			expect(e).toBeInstanceOf(BadRequestException);
		}

		jest
			.spyOn(service, 'searchUser')
			.mockImplementation(async (nickname: string) => {
				return [
					{ id: 1, nickname: 'test1' },
					{ id: 2, nickname: 'test2' },
				] as User[];
			});

		const result = await controller.searchUser('test');
		expect(result).toBeDefined();
		expect(result[0]).toHaveProperty('id');
		expect(result[0]).toHaveProperty('nickname');
		expect(result[0].nickname).toBe('test1');
		expect(result[1]).toHaveProperty('id');
		expect(result[1]).toHaveProperty('nickname');
		expect(result[1].nickname).toBe('test2');
	});

	it('changeStatus', async () => {
		expect(controller.changeStatus).toBeDefined();

		const userData = {
			userId: 1,
			username: 'test',
			nickname: 'test',
		} as UserDataDto;

		jest
			.spyOn(service, 'changeStatus')
			.mockImplementation(
				async (userData: UserDataDto, status: UserShareStatus) => {
					return {
						id: 1,
						username: 'test',
						nickname: 'test',
						status: status,
					} as User;
				},
			);

		const result = await controller.changeStatus(
			userData,
			UserShareStatus.PUBLIC,
		);
		expect(result).toBeDefined();
		expect(result).toHaveProperty('status');
		expect(result.status).toBe(UserShareStatus.PUBLIC);
	});

	it('getShareLinkByNickname', async () => {
		expect(controller.getShareLinkByNickname).toBeDefined();

		jest
			.spyOn(service, 'getShareLinkByNickname')
			.mockImplementation(async (nickname: string) => {
				return 'test';
			});

		const result = await controller.getShareLinkByNickname('test');
		expect(result).toBeDefined();
		expect(result).toBe('test');
	});

	it('getUsernameByShareLink', async () => {
		expect(controller.getUsernameByShareLink).toBeDefined();

		jest
			.spyOn(service, 'getUsernameByShareLink')
			.mockImplementation(async (shareLink: string) => {
				return 'test';
			});

		const result = await controller.getUsernameByShareLink('test');
		expect(result).toBeDefined();
		expect(result).toBe('test');
	});
});
