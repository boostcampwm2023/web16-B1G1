import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
	@ApiProperty({
		description: '게시글 제목',
		example: 'test title',
		required: true,
	})
	title: string;

	@ApiProperty({
		description: '게시글 내용',
		example: 'test content',
		required: true,
	})
	content: string;

	@ApiProperty({
		description: '게시글 작성자',
		example: 'test author',
		required: true,
	})
	author: string;
}
