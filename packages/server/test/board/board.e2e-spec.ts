import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('BoardController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	describe('/board', () => {
		// #39 [06-02] 서버는 사용자의 글 데이터를 전송한다.
		it.todo('GET /board/:id');

		// (추가 필요) 서버는 사용자의 글 목록을 전송한다.
		it.todo('GET /board');

		// #45 [06-08] 서버는 좋아요 / 좋아요 취소 요청을 받아 데이터베이스의 데이터를 수정한다.
		it.todo('PATCH /board/:id/like');
		it.todo('PATCH /board/:id/unlike');

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
		it.todo('GET /board/by-author');

		// (추가 필요) 서버는 사용자의 요청에 따라 글을 수정한다.
		it.todo('PATCH /board/:id');

		// (추가 필요) 서버는 사용자의 요청에 따라 글을 삭제한다.
		it.todo('DELETE /board/:id');
	});
});
