import { Test, TestingModule } from '@nestjs/testing';
import { SentimentController } from '../../src/sentiment/sentiment.controller';
import { SentimentService } from '../../src/sentiment/sentiment.service';

describe('SentimentController', () => {
	let controller: SentimentController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SentimentController],
			providers: [SentimentService],
		}).compile();

		controller = module.get<SentimentController>(SentimentController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
