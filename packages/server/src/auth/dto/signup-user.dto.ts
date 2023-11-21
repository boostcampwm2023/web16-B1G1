import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';

export class SignUpUserDto {
	@ApiProperty({
		description: '로그인용 아이디',
		example: 'test user',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	@MinLength(4)
	@Matches(/^[a-zA-Z0-9]+$/, {
		message: '아이디는 영문자와 숫자만 사용할 수 있습니다.',
	})
	username: string;

	@ApiProperty({
		description: '비밀번호',
		example: 'test password',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	@MinLength(8)
	password: string;

	@ApiProperty({
		description: '닉네임',
		example: 'test nickname',
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	@MinLength(2)
	@Matches(/^[a-zA-Z0-9가-힣]+$/, {
		message: '닉네임은 영문자, 숫자, 한글만 사용할 수 있습니다.',
	})
	nickname: string;
}
