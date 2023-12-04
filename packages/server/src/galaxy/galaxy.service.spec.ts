import { Test, TestingModule } from '@nestjs/testing';
import { GalaxyService } from './galaxy.service';

describe('GalaxyService', () => {
  let service: GalaxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GalaxyService],
    }).compile();

    service = module.get<GalaxyService>(GalaxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
