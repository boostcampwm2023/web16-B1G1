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
			throw new InternalServerErrorException('User not found in request');
		}

		return req.user;
	},
);
