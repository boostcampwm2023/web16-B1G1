import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UserDataDto {
	@IsNotEmpty()
	@IsInt()
	userId: number;

	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	nickname: string;
}
