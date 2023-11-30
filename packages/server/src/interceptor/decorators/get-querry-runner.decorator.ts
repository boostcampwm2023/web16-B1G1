import {
	ExecutionContext,
	createParamDecorator,
	InternalServerErrorException,
} from '@nestjs/common';
import { QueryRunner } from 'typeorm';

export const GetQueryRunner = createParamDecorator(
	(data: keyof QueryRunner | undefined, context: ExecutionContext) => {
		const req = context.switchToHttp().getRequest();

		const queryRunner = req.queryRunner as QueryRunner;
		if (!queryRunner) {
			throw new InternalServerErrorException(
				'TransactionInterceptor를 적용해야 @QuerryRunner를 사용할 수 있습니다.',
			);
		}

		return queryRunner;
	},
);
