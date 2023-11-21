import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';

export class CreateBoardDto {
	@IsNotEmpty({ message: '게시글 제목은 필수 입력입니다.' })
	@IsString({ message: '게시글 제목은 문자열로 입력해야 합니다.' })
	@MaxLength(255, { message: '게시글 제목은 255자 이내로 입력해야 합니다.' })
	@ApiProperty({
		description: '게시글 제목',
		example: 'test title',
		required: true,
	})
	title: string;

	@IsNotEmpty({ message: '게시글 내용은 필수 입력입니다.' })
	@IsString({ message: '게시글 내용은 문자열로 입력해야 합니다.' })
	@ApiProperty({
		description: '게시글 내용',
		example: 'test content',
		required: true,
	})
	content: string;

	@IsNotEmpty({ message: '게시글 작성자는 필수 입력입니다.' })
	@IsString({ message: '게시글 작성자는 문자열로 입력해야 합니다.' })
	@MaxLength(50, { message: '게시글 작성자는 50자 이내로 입력해야 합니다.' })
	@ApiProperty({
		description: '게시글 작성자',
		example: 'test author',
		required: true,
	})
	author: string;
}
