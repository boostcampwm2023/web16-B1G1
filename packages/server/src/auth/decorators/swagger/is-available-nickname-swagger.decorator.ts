import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

const apiOperation = {
	summary: 'nickname 중복 확인',
	description: 'nickname 중복을 확인합니다.',
};

const apiOkResponse = {
	status: 200,
	description: 'nickname 중복 아님(회원가입 가능)',
};

const apiBadRequestResponse = {
	status: 400,
	description: '쿼리 스트링에 nickname이 없음',
};

const apiConflictResponse = {
	status: 409,
	description: 'nickname 중복(회원가입 불가능)',
};

export const IsAvailableNicknameSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiConflictResponse(apiConflictResponse),
	);
};
