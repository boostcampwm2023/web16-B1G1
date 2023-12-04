import { Test, TestingModule } from '@nestjs/testing';
import { GalaxyController } from '../../src/galaxy/galaxy.controller';
import { GalaxyService } from '../../src/galaxy/galaxy.service';

describe('GalaxyController', () => {
	let controller: GalaxyController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GalaxyController],
			providers: [GalaxyService],
		}).compile();

		controller = module.get<GalaxyController>(GalaxyController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
