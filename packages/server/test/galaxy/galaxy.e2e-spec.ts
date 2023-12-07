import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { AppModule } from '../../src/app.module';

describe('GalaxyController', () => {
	let app: INestApplication;
	let accessToken: string;

	beforeEach(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.use(cookieParser());
		await app.init();

		// 유저 만들고 로그인 후 accessToken 받아오기
		const randomeBytes = Math.random().toString(36).slice(2, 10);

		const newUser = {
			username: randomeBytes,
			nickname: randomeBytes,
			password: randomeBytes,
		};

		await request(app.getHttpServer()).post('/auth/signup').send(newUser);

		newUser.nickname = undefined;
		const signInResponse = await request(app.getHttpServer())
			.post('/auth/signin')
			.send(newUser);

		signInResponse.headers['set-cookie'].forEach((cookie: string) => {
			if (cookie.includes('accessToken')) {
				accessToken = cookie.split(';')[0].split('=')[1];
			}
		});
	});

	it('should be defined', () => {
		expect(app).toBeDefined();
	});

	it('GET /galaxy', async () => {
		const response = await request(app.getHttpServer())
			.get('/galaxy')
			.set('Cookie', [`accessToken=${accessToken}`])
			.expect(200);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(body).toHaveProperty('_id');
	});

	it('GET /galaxy/by-nickname', async () => {
		const randomeBytes = Math.random().toString(36).slice(2, 10);

		const newUser = {
			username: randomeBytes,
			nickname: randomeBytes,
			password: randomeBytes,
		};

		await request(app.getHttpServer()).post('/auth/signup').send(newUser);

		const response = await request(app.getHttpServer())
			.get('/galaxy/by-nickname')
			.query({ nickname: newUser.nickname })
			.expect(200);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(body).toHaveProperty('_id');
	});

	it('PATCH /galaxy', async () => {
		const testCase = { test: 'test', test_nested: { test: 'test' } };
		await request(app.getHttpServer())
			.patch('/galaxy')
			.set('Cookie', [`accessToken=${accessToken}`])
			.send(testCase)
			.expect(200);

		const response = await request(app.getHttpServer())
			.get('/galaxy')
			.set('Cookie', [`accessToken=${accessToken}`]);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(body).toHaveProperty('_id');
		expect(body).toMatchObject(testCase);
	});

	afterAll(async () => {
		await app.close();
	});
});
