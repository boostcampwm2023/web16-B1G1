import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('SentimentController', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('should be defined', () => {
		expect(app).toBeDefined();
	});

	it('POST /sentiment', async () => {
		const response = await request(app.getHttpServer())
			.post('/sentiment')
			.send({ content: 'test' })
			.expect(200);

		expect(response).toHaveProperty('body');
		const { body } = response;
		expect(body).toHaveProperty('color');
		const { color } = body;
		expect(typeof color).toBe('string');
		expect(color.startsWith('#')).toBe(true);
	});
});
