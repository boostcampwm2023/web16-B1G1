import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
	IsNickname,
	IsPassword,
	IsUsername,
} from '../decorators/signup-constraints.decorator';
import { SignUpEnum } from '../enums/signup.enum';

export class SignUpUserDto {
	@ApiProperty({
		description: '로그인용 아이디',
		example: 'test user',
		required: true,
	})
	@IsNotEmpty({ message: SignUpEnum.USERNAME_NOTEMPTY_MESSAGE as string })
	@IsString({ message: SignUpEnum.USERNAME_ISSTRING_MESSAGE as string })
	@IsUsername()
	username: string;

	@ApiProperty({
		description: '비밀번호',
		example: 'test password',
		required: true,
	})
	@IsNotEmpty({ message: SignUpEnum.PASSWORD_NOTEMPTY_MESSAGE as string })
	@IsString({ message: SignUpEnum.PASSWORD_ISSTRING_MESSAGE as string })
	@IsPassword()
	password: string;

	@ApiProperty({
		description: '닉네임',
		example: 'test nickname',
		required: true,
	})
	@IsNotEmpty({ message: SignUpEnum.NICKNAME_NOTEMPTY_MESSAGE as string })
	@IsString({ message: SignUpEnum.NICKNAME_ISSTRING_MESSAGE as string })
	@IsNickname()
	nickname: string;
}
