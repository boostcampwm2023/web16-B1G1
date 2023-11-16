import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AuthController (/auth, e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	// #12 [02-05] 서버는 아이디 중복을 검사하고 결과를 클라이언트에 전송한다.
	it.todo('GET /auth/check-duplicate-username');

	// #91 [02-12] 서버는 닉네임 중복을 검사하고 결과를 클라이언트에 전송한다.
	it.todo('GET /auth/check-duplicate-nickname');

	// #16 [02-09] 서버는 회원가입 데이터를 받아 형식 검사와 아이디 중복검사를 진행한다.
	// #17 [02-10] 검사에 통과하면 회원 정보를 데이터베이스에 저장한다.
	it('POST /auth/signup', async () => {
		const randomeBytes = Math.random().toString(36).slice(2, 10);

		const newUser = {
			username: randomeBytes,
			nickname: randomeBytes,
			password: randomeBytes,
		};

		const response = await request(app.getHttpServer())
			.post('/auth/signup')
			.send(newUser)
			.expect(201);

		expect(response).toHaveProperty('body');
		const createdUser = response.body;
		expect(createdUser).toHaveProperty('id');
		expect(typeof createdUser.id).toBe('number');

		expect(createdUser).toMatchObject({
			username: newUser.username,
			nickname: newUser.nickname,
		});
	});

	// #20 [03-02] 사용자가 정보제공을 허용하여 콜백 API 요청을 받으면, 백엔드 서버는 요청에 포함된 코드를 통해 해당 서비스의 인가 서버에 액세스 토큰을 요청한다.
	// #21 [03-03] 액세스 토큰을 전달받으면, 백엔드 서버는 액세스 토큰을 통해 해당 서비스의 리소스 서버에 사용자 정보를 요청한다.
	// #22 [03-04] 사용자 정보를 전달받으면, 필요한 속성만 추출하여 회원 정보를 데이터베이스에 저장한다.
	// it.todo('GET /auth/oauth/:service');
	// it.todo('GET /auth/oauth/:service/callback');

	// #27 [04-04] 데이터베이스에서 로그인 데이터로 조회를 하여 비교한다.
	// #28 [04-05] 없는 회원 정보라면 NotFoundError를 응답한다.
	// #29 [04-06] 있는 회원 정보라면 JWT(Access Token 및 Refresh Token)를 발급하고 쿠키에 저장한다.
	// #30 [04-07] JWT에 대한 Refresh Token을 Redis에 저장한다.
	it.todo('POST /auth/signin');

	// #33 [05-02] 로그아웃 요청을 받으면 토큰을 읽어 해당 회원의 로그인 여부를 확인한다.
	// #34 [05-03] 로그인을 하지 않은 사용자의 요청이라면 BadRequest 에러를 반환한다.
	// #35 [05-04] 로그인을 한 사용자라면 Redis의 Refresh Token 정보를 삭제한다.
	// #36 [05-05] 브라우저 쿠키의 JWT를 없애는 요청을 보낸다.
	it.todo('POST /auth/signout');
});
