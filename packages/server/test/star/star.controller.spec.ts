import { Test, TestingModule } from '@nestjs/testing';
import { StarController } from '../../src/star/star.controller';
import { StarService } from '../../src/star/star.service';

describe('StarController', () => {
	let controller: StarController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [StarController],
			providers: [StarService],
		}).compile();

		controller = module.get<StarController>(StarController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
