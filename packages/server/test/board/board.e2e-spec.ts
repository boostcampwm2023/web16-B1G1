import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Board } from '../../src/board/entities/board.entity';
import { UpdateBoardDto } from 'src/board/dto/update-board.dto';
import { CreateBoardDto } from 'src/board/dto/create-board.dto';

describe('BoardController (/board, e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	// #39 [06-02] 서버는 사용자의 글 데이터를 전송한다.
	it('GET /board/:id', async () => {
		const response = await request(app.getHttpServer())
			.get('/board/1')
			.expect(200);

		expect(response).toHaveProperty('body');
		expect((response as any).body).toHaveProperty('id');
		expect(response.body.id).toBe(1);
		expect((response as any).body).toHaveProperty('title');
		expect((response as any).body).toHaveProperty('content');
		expect((response as any).body).toHaveProperty('author');
		expect((response as any).body).toHaveProperty('created_at');
		expect((response as any).body).toHaveProperty('updated_at');
	});

	// (추가 필요) 서버는 사용자의 글 목록을 전송한다.
	it('GET /board', async () => {
		const response = await request(app.getHttpServer())
			.get('/board')
			.expect(200);

		expect(response).toHaveProperty('body');
		expect(response.body).toBeInstanceOf(Array);

		const boards = response.body as Board[];
		if (boards.length > 0) {
			expect(boards[0]).toHaveProperty('id');
			expect(boards[0]).toHaveProperty('title');
		}
	});

	// #45 [06-08] 서버는 좋아요 / 좋아요 취소 요청을 받아 데이터베이스의 데이터를 수정한다.
	it('PATCH /board/:id/like', async () => {
		const board = {
			title: 'test',
			content: 'test',
			author: 'test',
		};
		const createdBoard = (
			await request(app.getHttpServer()).post('/board').send(board)
		).body;
		expect(createdBoard).toHaveProperty('like_cnt');
		const cntBeforeLike = createdBoard.like_cnt;

		const resLike = await request(app.getHttpServer())
			.patch(`/board/${createdBoard.id}/like`)
			.expect(200);

		expect(resLike).toHaveProperty('body');
		expect(resLike.body).toHaveProperty('like_cnt');
		const cntAfterLike = resLike.body.like_cnt;

		expect(cntAfterLike).toBe(cntBeforeLike + 1);
	});
	it('PATCH /board/:id/unlike', async () => {
		const board = {
			title: 'test',
			content: 'test',
			author: 'test',
		};
		const createdBoard = (
			await request(app.getHttpServer()).post('/board').send(board)
		).body;
		expect(createdBoard).toHaveProperty('like_cnt');
		const cntBeforeUnlike = createdBoard.like_cnt;

		const resUnlike = await request(app.getHttpServer())
			.patch(`/board/${createdBoard.id}/unlike`)
			.expect(200);

		expect(resUnlike).toHaveProperty('body');
		expect(resUnlike.body).toHaveProperty('like_cnt');
		const cntAfterUnlike = resUnlike.body.like_cnt;

		expect(cntAfterUnlike).toBe(cntBeforeUnlike - 1);
	});

	// #60 [08-06] 서버는 전송 받은 데이터를 데이터베이스에 저장한다.
	it('POST /board', async () => {
		const board = {
			title: 'test',
			content: 'test',
			author: 'test',
		};
		const response = await request(app.getHttpServer())
			.post('/board')
			.send(board)
			.expect(201);

		expect(response).toHaveProperty('body');
		expect((response as any).body).toMatchObject(board);
		expect((response as any).body).toHaveProperty('id');
		expect(typeof response.body.id).toBe('number');
	});

	// #65 [09-03] 서버는 검색된 사용자의 글 데이터를 전송한다.
	it('GET /board/by-author', async () => {
		const author = 'testuser';
		const board = {
			title: 'test',
			content: 'test',
			author,
		};
		await request(app.getHttpServer()).post('/board').send(board);

		const response = await request(app.getHttpServer())
			.get(`/board/by-author?author=${author}`)
			.expect(200);

		expect(response).toHaveProperty('body');
		expect(response.body).toBeInstanceOf(Array);

		const boards = response.body as Board[];
		expect(boards.length).toBeGreaterThan(0);
		expect(boards[0]).toHaveProperty('id');
		expect(boards[0]).toHaveProperty('title');
	});

	// (추가 필요) 서버는 사용자의 요청에 따라 글을 수정한다.
	it('PATCH /board/:id', async () => {
		const board = {
			title: 'test',
			content: 'test',
			author: 'test',
		};
		const createdBoard = (
			await request(app.getHttpServer()).post('/board').send(board)
		).body;
		expect(createdBoard).toHaveProperty('id');
		const id = createdBoard.id;

		const toUpdate: UpdateBoardDto = {
			title: 'updated',
			content: 'updated',
		};

		const updated = await request(app.getHttpServer())
			.patch(`/board/${id}`)
			.send({ title: 'updated', content: 'updated' })
			.expect(200);

		expect(updated).toHaveProperty('body');
		const updatedBoard = updated.body;

		expect(updatedBoard).toHaveProperty('id');
		expect(updatedBoard.id).toBe(id);
		expect(updatedBoard).toHaveProperty('title');
		expect(updatedBoard.title).toBe(toUpdate.title);
		expect(updatedBoard).toHaveProperty('content');
		expect(updatedBoard.content).toBe(toUpdate.content);
	});

	// (추가 필요) 서버는 사용자의 요청에 따라 글을 삭제한다.
	it('DELETE /board/:id', async () => {
		const board: CreateBoardDto = {
			title: 'test',
			content: 'test',
			author: 'test',
		};
		const newBoard = (
			await request(app.getHttpServer()).post('/board').send(board)
		).body;

		await request(app.getHttpServer())
			.delete(`/board/${newBoard.id}`)
			.expect(200);

		await request(app.getHttpServer()).get(`/board/${newBoard.id}`).expect(404);
	});

	// #61 [08-07] 사진 정보는 스토리지 서버에 저장한다.
	it('POST /board/:id/image', async () => {
		const board: CreateBoardDto = {
			title: 'test',
			content: 'test',
			author: 'test',
		};
		const newBoard = (
			await request(app.getHttpServer()).post('/board').send(board)
		).body;

		const image = Buffer.from('test');

		const response = await request(app.getHttpServer())
			.post(`/board/${newBoard.id}/image`)
			.attach('file', image, 'test.png')
			.expect(201);

		expect(response).toHaveProperty('body');
		expect((response as any).body).toHaveProperty('id');
		expect(response.body.id).toBe(newBoard.id);
		expect((response as any).body).toHaveProperty('filename');
	});
});
