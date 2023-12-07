import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsString, MaxLength } from 'class-validator';

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
	@MaxLength(1000, { message: '게시글 내용은 1000자 이내로 입력해야 합니다.' })
	@ApiProperty({
		description: '게시글 내용',
		example: 'test content',
		required: true,
	})
	content: string;

	@IsNotEmpty({ message: '별 스타일은 필수 입력입니다.' })
	@IsJSON({ message: '별 스타일은 JSON 형식으로 입력해야 합니다.' })
	@ApiProperty({
		description: '별 스타일',
		example: '{"color":"#000000", "position":{ "x": 50, "y": 0, "z": -50}}',
		required: true,
	})
	star: string;
}
