import {
	ExecutionContext,
	createParamDecorator,
	InternalServerErrorException,
} from '@nestjs/common';
import { UserDataDto } from '../dto/user-data.dto';

export const GetUser = createParamDecorator(
	(data: keyof UserDataDto | undefined, context: ExecutionContext) => {
		const req = context.switchToHttp().getRequest();

		const user = req.user as UserDataDto;
		if (!user) {
			throw new InternalServerErrorException(
				'CookieAuthGuard를 적용해야 @GetUser를 사용할 수 있습니다.',
			);
		}

		return req.user;
	},
);
