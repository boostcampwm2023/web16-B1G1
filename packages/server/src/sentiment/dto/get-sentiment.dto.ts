import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetSentimentDto {
	@IsNotEmpty({ message: '게시글 내용은 필수 입력입니다.' })
	@IsString({ message: '게시글 내용은 문자열로 입력해야 합니다.' })
	@MaxLength(1000, { message: '게시글 내용은 1000자 이내로 입력해야 합니다.' })
	@ApiProperty({
		description: '게시글 내용',
		example: 'test content',
		required: true,
	})
	content: string;
}
