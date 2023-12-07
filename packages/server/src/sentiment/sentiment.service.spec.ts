import { Test, TestingModule } from '@nestjs/testing';
import { SentimentService } from './sentiment.service';

describe('SentimentService', () => {
  let service: SentimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentimentService],
    }).compile();

    service = module.get<SentimentService>(SentimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
