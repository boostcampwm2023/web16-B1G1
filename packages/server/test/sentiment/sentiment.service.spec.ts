import { Test, TestingModule } from '@nestjs/testing';
import { SentimentService } from '../../src/sentiment/sentiment.service';
import {
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';

describe('SentimentService', () => {
	let service: SentimentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SentimentService],
		}).compile();

		service = module.get<SentimentService>(SentimentService);

		// jest.mock('fetch');
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getSentiment', () => {
		it('should throw BadRequestException with empty content', async () => {
			await expect(service.getSentiment({ content: '' })).rejects.toThrow(
				'content is required',
			);

			await expect(service.getSentiment({ content: '' })).rejects.toThrow(
				BadRequestException,
			);
		});

		it('shold throw InternalServerErrorException with error', async () => {
			jest.spyOn(global, 'fetch').mockResolvedValue({
				json: async () => {
					return { error: 'error' };
				},
			} as any);

			await expect(service.getSentiment({ content: 'test' })).rejects.toThrow(
				'sentiment api failed',
			);

			await expect(service.getSentiment({ content: 'test' })).rejects.toThrow(
				InternalServerErrorException,
			);
		});

		it('should throw InternalServerErrorException with no positive, negative, or neutral', async () => {
			jest.spyOn(global, 'fetch').mockResolvedValue({
				json: async () => {
					return { document: { confidence: {} } };
				},
			} as any);

			await expect(service.getSentiment({ content: 'test' })).rejects.toThrow(
				'sentiment api failed',
			);

			await expect(service.getSentiment({ content: 'test' })).rejects.toThrow(
				InternalServerErrorException,
			);
		});

		it('should return sentiment', async () => {
			const sentiment = await service.getSentiment({ content: 'test' });
			expect(sentiment).toBeDefined();
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});
});
