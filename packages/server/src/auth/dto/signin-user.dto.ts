import { ApiProperty } from '@nestjs/swagger';
import { UserEnum } from '../enums/user.enum';
import { IsNotEmpty, IsString } from 'class-validator';
import {
	IsPassword,
	IsUsername,
} from '../decorators/user-constraints.decorator';

export class SignInUserDto {
	@ApiProperty({
		description: '로그인용 아이디',
		example: 'test user',
		required: true,
	})
	@IsNotEmpty({ message: UserEnum.USERNAME_NOTEMPTY_MESSAGE as string })
	@IsString({ message: UserEnum.USERNAME_ISSTRING_MESSAGE as string })
	@IsUsername()
	username: string;

	@ApiProperty({
		description: '비밀번호',
		example: 'test password',
		required: true,
	})
	@IsNotEmpty({ message: UserEnum.PASSWORD_NOTEMPTY_MESSAGE as string })
	@IsString({ message: UserEnum.PASSWORD_ISSTRING_MESSAGE as string })
	@IsPassword()
	password: string;
}
