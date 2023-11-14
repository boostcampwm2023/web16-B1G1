import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from '../../src/board/board.controller';
import { BoardService } from '../../src/board/board.service';

describe('BoardController', () => {
	let controller: BoardController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [BoardController],
			providers: [BoardService],
		}).compile();

		controller = module.get<BoardController>(BoardController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
