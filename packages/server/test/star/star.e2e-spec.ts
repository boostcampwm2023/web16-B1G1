import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { AppModule } from '../../src/app.module';

describe('StarController', () => {
	let app: INestApplication;
	let accessToken: string;
	let initialNickname: string;
	let initialPost;
	let initialStar;

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
		initialNickname = randomeBytes;

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

		// POST /post로 게시글 하나 생성하기
		initialStar = { test: 'test' };
		const post = {
			title: 'test',
			content: 'test',
			star: JSON.stringify(initialStar),
		};

		const postResponse = await request(app.getHttpServer())
			.post('/post')
			.set('Cookie', [`accessToken=${accessToken}`])
			.send(post);

		initialPost = postResponse.body;
	});

	it('should be defined', () => {
		expect(app).toBeDefined();
	});

	it('GET /star', async () => {
		const response = await request(app.getHttpServer())
			.get('/star')
			.set('Cookie', [`accessToken=${accessToken}`])
			.expect(200);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(typeof body).toBe('object');
		expect(body.length).toBe(1);
		const post = body[0];

		expect(post).toHaveProperty('id');
		expect(post.id).toBe(initialPost.id);
		expect(post).toHaveProperty('title');
		expect(post.title).toBe(initialPost.title);
		expect(post).toHaveProperty('star');
		expect(post.star).toMatchObject(initialStar);
	});

	it('GET /star/by-author', async () => {
		const response = await request(app.getHttpServer())
			.get('/star/by-author')
			.query({ author: initialNickname })
			.expect(200);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(typeof body).toBe('object');
		expect(body.length).toBe(1);
		const post = body[0];

		expect(post).toHaveProperty('id');
		expect(post.id).toBe(initialPost.id);
		expect(post).toHaveProperty('title');
		expect(post.title).toBe(initialPost.title);
		expect(post).toHaveProperty('star');
		expect(post.star).toMatchObject(initialStar);
	});

	it('PATCH /star/:id', async () => {
		const testCase = { test: 'test', test_nested: { test: 'test' } };
		await request(app.getHttpServer())
			.patch(`/star/${initialPost.id}`)
			.set('Cookie', [`accessToken=${accessToken}`])
			.send(testCase)
			.send(testCase)
			.expect(200);

		const response = await request(app.getHttpServer())
			.get('/star')
			.set('Cookie', [`accessToken=${accessToken}`]);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(typeof body).toBe('object');
		expect(body.length).toBe(1);
		const post = body[0];

		expect(post).toHaveProperty('id');
		expect(post.id).toBe(initialPost.id);
		expect(post).toHaveProperty('title');
		expect(post.title).toBe(initialPost.title);
		expect(post).toHaveProperty('star');
		expect(post.star).toMatchObject(initialStar);
	});

	afterAll(async () => {
		await app.close();
	});
});
