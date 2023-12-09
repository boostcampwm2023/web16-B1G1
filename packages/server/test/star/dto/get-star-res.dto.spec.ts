import { GetStarResDto } from '../../../src/star/dto/get-star-res.dto';

describe('GetStarResDto', () => {
	it('should be defined', () => {
		expect(GetStarResDto).toBeDefined();
	});

	it('should have id, title', () => {
		const getStarResDto: GetStarResDto = {
			id: 1,
			title: 'title',
		};
		expect(getStarResDto).toHaveProperty('id');
		expect(getStarResDto).toHaveProperty('title');
	});
});
