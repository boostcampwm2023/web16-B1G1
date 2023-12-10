import { GetBoardByIdResDto } from 'src/board/dto/get-board-by-id-res.dto';

describe('GetBoardByIdResDto', () => {
	it('should be defined', () => {
		expect(GetBoardByIdResDto).toBeDefined();
	});

	it('should be defined with id, title, content, like_cnt, images', () => {
		const getBoardByIdResDto: GetBoardByIdResDto = {
			id: 1,
			title: 'test',
			content: 'test',
			like_cnt: 1,
			images: ['test'],
		};

		expect(getBoardByIdResDto).toMatchObject({
			id: 1,
			title: 'test',
			content: 'test',
			like_cnt: 1,
			images: ['test'],
		});
		expect(getBoardByIdResDto).toHaveProperty('id');
		expect(getBoardByIdResDto).toHaveProperty('title');
		expect(getBoardByIdResDto).toHaveProperty('content');
		expect(getBoardByIdResDto).toHaveProperty('like_cnt');
		expect(getBoardByIdResDto).toHaveProperty('images');
	});
});
