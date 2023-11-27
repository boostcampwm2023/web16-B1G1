import { Test, TestingModule } from '@nestjs/testing';
import { StarService } from './star.service';

describe('StarService', () => {
  let service: StarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarService],
    }).compile();

    service = module.get<StarService>(StarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
