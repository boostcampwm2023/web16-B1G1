import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateImageDto {
	@IsNotEmpty({ message: 'fieldname이 누락되었습니다.' })
	@IsString({ message: 'fieldname은 문자열로 입력해야 합니다.' })
	fieldname: string;

	@IsNotEmpty({ message: 'originalname이 누락되었습니다.' })
	@IsString({ message: 'originalname은 문자열로 입력해야 합니다.' })
	originalname: string;

	@IsNotEmpty({ message: 'encoding이 누락되었습니다.' })
	@IsString({ message: 'encoding은 문자열로 입력해야 합니다.' })
	encoding: string;

	@IsNotEmpty({ message: 'mimetype이 누락되었습니다.' })
	@IsString({ message: 'mimetype은 문자열로 입력해야 합니다.' })
	@MaxLength(50, { message: 'mimetype은 50자 이내로 입력해야 합니다.' })
	mimetype: string;

	@IsNotEmpty({ message: 'destination이 누락되었습니다.' })
	@IsString({ message: 'destination은 문자열로 입력해야 합니다.' })
	destination: string;

	@IsNotEmpty({ message: 'filename이 누락되었습니다.' })
	@IsString({ message: 'filename은 문자열로 입력해야 합니다.' })
	@MaxLength(50, { message: 'filename은 50자 이내로 입력해야 합니다.' })
	filename: string;

	@IsNotEmpty({ message: 'path가 누락되었습니다.' })
	@IsString({ message: 'path는 문자열로 입력해야 합니다.' })
	@MaxLength(50, { message: 'path는 50자 이내로 입력해야 합니다.' })
	path: string;

	@IsNotEmpty({ message: 'size가 누락되었습니다.' })
	@IsInt({ message: 'size는 숫자로 입력해야 합니다.' })
	size: number;
}
