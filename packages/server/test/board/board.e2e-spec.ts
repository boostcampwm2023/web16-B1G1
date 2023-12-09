import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Board } from '../../src/board/entities/board.entity';
import { UpdateBoardDto } from '../../src/board/dto/update-board.dto';
import { CreateBoardDto } from '../../src/board/dto/create-board.dto';
import * as cookieParser from 'cookie-parser';
import { encryptAes } from '../../src/util/aes.util';
import { sampleImageBase64 } from './sample-image';

describe('BoardController (/board, e2e)', () => {
	let app: INestApplication;
	let accessToken: string;
	let post_id: number;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
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

		// 별글도 하나 생성 후 수행
		const board = {
			title: 'test',
			content: 'test',
			star: '{}',
		};
		const postedBoard = await request(app.getHttpServer())
			.post('/post')
			.set('Cookie', [`accessToken=${accessToken}`])
			.set('Content-Type', 'multipart/form-data')
			.field('title', board.title)
			.field('content', board.content)
			.field('star', board.star)
			.attach('file', Buffer.from(sampleImageBase64, 'base64'), {
				filename: 'test_image.jpg',
				contentType: 'image/jpg',
			});

		post_id = postedBoard.body.id;
	});

	// #60 [08-06] 서버는 전송 받은 데이터를 데이터베이스에 저장한다.
	it('POST /post', async () => {
		const board = {
			title: 'test',
			content: 'test',
			star: '{}',
		};
		const response = await request(app.getHttpServer())
			.post('/post')
			.set('Cookie', [`accessToken=${accessToken}`])
			.send(board)
			.expect(201);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(body).toHaveProperty('id');
		expect(typeof body.id).toBe('number');
		expect(body).toHaveProperty('title');
		expect(body.title).toBe(board.title);
		expect(body).toHaveProperty('content');
		expect(body.content).toBe(encryptAes(board.content)); // 암호화되었는지 확인
		expect(body).toHaveProperty('star');
		expect(typeof body.star).toBe('string');
	});

	it('POST /post with images', async () => {
		const board = {
			title: 'test',
			content: 'test',
			star: '{}',
		};

		const response = await request(app.getHttpServer())
			.post('/post')
			.set('Cookie', [`accessToken=${accessToken}`])
			.set('Content-Type', 'multipart/form-data')
			.field('title', board.title)
			.field('content', board.content)
			.field('star', board.star)
			.attach('file', Buffer.from(sampleImageBase64, 'base64'), {
				filename: 'test_image.jpg',
				contentType: 'image/jpg',
			})
			.expect(201);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(body).toHaveProperty('id');
		expect(typeof body.id).toBe('number');
		expect(body).toHaveProperty('title');
		expect(body.title).toBe(board.title);
		expect(body).toHaveProperty('content');
		expect(body.content).toBe(encryptAes(board.content)); // 암호화되었는지 확인
		expect(body).toHaveProperty('star');
		expect(typeof body.star).toBe('string');
		expect(body).toHaveProperty('images');
		expect(Array.isArray(body.images)).toBe(true);
	});

	// #39 [06-02] 서버는 사용자의 글 데이터를 전송한다.
	it('GET /post/:id', async () => {
		const board: CreateBoardDto = {
			title: 'test',
			content: 'test',
			star: '{}',
		};
		const newBoard = (
			await request(app.getHttpServer())
				.post('/post')
				.set('Cookie', [`accessToken=${accessToken}`])
				.send(board)
		).body;

		const response = await request(app.getHttpServer())
			.get(`/post/${newBoard.id}`)
			.expect(200);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(body).toHaveProperty('id');
		expect(body.id).toBe(newBoard.id);
		expect(body).toHaveProperty('title');
		expect(body).toHaveProperty('content');
		expect(body).toHaveProperty('like_cnt');
		expect(body).toHaveProperty('images');
	});

	it('GET /post/:id/is-liked', async () => {
		const response = await request(app.getHttpServer())
			.get(`/post/${post_id}/is-liked`)
			.set('Cookie', [`accessToken=${accessToken}`])
			.expect(200);

		expect(response).toHaveProperty('body');
		const { text } = response;
		expect(text === 'true' || text === 'false').toBe(true);
	});

	// (추가 필요) 서버는 사용자의 요청에 따라 글을 수정한다.
	it('PATCH /post/:id', async () => {
		const board = {
			title: 'test',
			content: 'test',
			star: '{}',
		};
		const createdBoard = (
			await request(app.getHttpServer())
				.post('/post')
				.set('Cookie', [`accessToken=${accessToken}`])
				.send(board)
		).body;
		expect(createdBoard).toHaveProperty('id');
		const id = createdBoard.id;

		const toUpdate: UpdateBoardDto = {
			title: 'updated',
			content: 'updated',
		};

		const updated = await request(app.getHttpServer())
			.patch(`/post/${id}`)
			.set('Cookie', [`accessToken=${accessToken}`])
			.send(toUpdate)
			.expect(200);

		expect(updated).toHaveProperty('body');
		const updatedBoard = updated.body;

		expect(updatedBoard).toHaveProperty('id');
		expect(updatedBoard.id).toBe(id);
		expect(updatedBoard).toHaveProperty('title');
		expect(updatedBoard.title).toBe(toUpdate.title);
		expect(updatedBoard).toHaveProperty('content');
		expect(updatedBoard.content).toBe(encryptAes(toUpdate.content));
	});

	it('PATCH /post/:id with images', async () => {
		const board = {
			title: 'test',
			content: 'test',
			star: '{}',
		};
		const createdBoard = (
			await request(app.getHttpServer())
				.post('/post')
				.set('Cookie', [`accessToken=${accessToken}`])
				.send(board)
		).body;
		expect(createdBoard).toHaveProperty('id');
		const id = createdBoard.id;

		const toUpdate: UpdateBoardDto = {
			title: 'updated',
			content: 'updated',
		};

		const updated = await request(app.getHttpServer())
			.patch(`/post/${id}`)
			.set('Cookie', [`accessToken=${accessToken}`])
			.set('Content-Type', 'multipart/form-data')
			.field('title', toUpdate.title)
			.field('content', toUpdate.content)
			.attach('file', Buffer.from(sampleImageBase64, 'base64'), {
				filename: 'test_image_updated1.jpg',
				contentType: 'image/jpg',
			})
			.attach('file', Buffer.from(sampleImageBase64, 'base64'), {
				filename: 'test_image_updated2.jpg',
				contentType: 'image/jpg',
			})
			.expect(200);

		expect(updated).toHaveProperty('body');
		const updatedBoard = updated.body;
		expect(updatedBoard).toHaveProperty('id');
		expect(updatedBoard.id).toBe(id);
		expect(updatedBoard).toHaveProperty('title');
		expect(updatedBoard.title).toBe(toUpdate.title);
		expect(updatedBoard).toHaveProperty('content');
		expect(updatedBoard.content).toBe(encryptAes(toUpdate.content));
		expect(updatedBoard).toHaveProperty('images');
		expect(Array.isArray(updatedBoard.images)).toBe(true);
	});

	// #45 [06-08] 서버는 좋아요 / 좋아요 취소 요청을 받아 데이터베이스의 데이터를 수정한다.
	it('PATCH /post/:id/like', async () => {
		const board = {
			title: 'test',
			content: 'test',
			star: '{}',
		};

		const resCreate = await request(app.getHttpServer())
			.post('/post')
			.set('Cookie', [`accessToken=${accessToken}`])
			.send(board);
		const createdBoard = resCreate.body;
		expect(createdBoard).toHaveProperty('like_cnt');
		const cntBeforeLike = createdBoard.like_cnt;

		const resLike = await request(app.getHttpServer())
			.patch(`/post/${createdBoard.id}/like`)
			.set('Cookie', [`accessToken=${accessToken}`])
			.expect(200);

		expect(resLike).toHaveProperty('body');
		expect(resLike.body).toHaveProperty('like_cnt');
		const cntAfterLike = resLike.body.like_cnt;

		expect(cntAfterLike).toBe(cntBeforeLike + 1);
	});

	it('PATCH /post/:id/unlike', async () => {
		const board = {
			title: 'test',
			content: 'test',
			star: '{}',
		};
		const createdBoard = (
			await request(app.getHttpServer())
				.post('/post')
				.set('Cookie', [`accessToken=${accessToken}`])
				.send(board)
		).body;
		const likedBoard = (
			await request(app.getHttpServer())
				.patch(`/post/${createdBoard.id}/like`)
				.set('Cookie', [`accessToken=${accessToken}`])
		).body;

		const cntBeforeUnlike = likedBoard.like_cnt;

		const resUnlike = await request(app.getHttpServer())
			.patch(`/post/${createdBoard.id}/unlike`)
			.set('Cookie', [`accessToken=${accessToken}`])
			.expect(200);

		expect(resUnlike).toHaveProperty('body');
		expect(resUnlike.body).toHaveProperty('like_cnt');
		const cntAfterUnlike = resUnlike.body.like_cnt;

		expect(cntAfterUnlike).toBe(cntBeforeUnlike - 1);
	});

	// (추가 필요) 서버는 사용자의 요청에 따라 글을 삭제한다.
	it('DELETE /post/:id', async () => {
		const board: CreateBoardDto = {
			title: 'test',
			content: 'test',
			star: '{}',
		};
		const newBoard = (
			await request(app.getHttpServer())
				.post('/post')
				.set('Cookie', [`accessToken=${accessToken}`])
				.send(board)
		).body;

		await request(app.getHttpServer())
			.delete(`/post/${newBoard.id}`)
			.set('Cookie', [`accessToken=${accessToken}`])
			.expect(200);

		await request(app.getHttpServer()).get(`/post/${newBoard.id}`).expect(404);
	});

	it('GET /post/:id', async () => {
		const { body } = await request(app.getHttpServer())
			.get(`/post/${post_id}`)
			.expect(200);

		expect(body).toHaveProperty('id');
		expect(body.id).toBe(post_id);
	});

	afterEach(async () => {
		// 로그아웃
		await request(app.getHttpServer())
			.post('/auth/signout')
			.set('Cookie', [`accessToken=${accessToken}`]);
		await app.close();
	});
});
