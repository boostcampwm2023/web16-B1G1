import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
	IsNickname,
	IsPassword,
	IsUsername,
} from '../decorators/signup-constraints.decorator';

export class SignUpUserDto {
	@ApiProperty({
		description: '로그인용 아이디',
		example: 'test user',
		required: true,
	})
	@IsNotEmpty({ message: '아이디는 필수 입력값입니다.' })
	@IsString({ message: '아이디는 문자열이어야 합니다.' })
	@IsUsername()
	username: string;

	@ApiProperty({
		description: '비밀번호',
		example: 'test password',
		required: true,
	})
	@IsNotEmpty({ message: '비밀번호는 필수 입력값입니다.' })
	@IsString({ message: '비밀번호는 문자열이어야 합니다.' })
	@IsPassword()
	password: string;

	@ApiProperty({
		description: '닉네임',
		example: 'test nickname',
		required: true,
	})
	@IsNotEmpty({ message: '닉네임은 필수 입력값입니다.' })
	@IsString({ message: '닉네임은 문자열이어야 합니다.' })
	@IsNickname()
	nickname: string;
}
