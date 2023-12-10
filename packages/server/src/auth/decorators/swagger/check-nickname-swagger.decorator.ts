import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '닉네임을 가진 유저 확인',
	description:
		'닉네임을 가진 유저가 있으면 true\n' +
		'닉네임을 가진 유저가 없으면 NotFoundError를 반환합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '닉네임을 가진 유저가 있어 true를 반환',
};

const apiBadRequestResponse = {
	status: 400,
	description: '쿼리스트링에 닉네임이 없어 BadRequestError를 반환',
};

const apiNotFoundResponse = {
	status: 404,
	description: '닉네임을 가진 유저가 없음',
};

export const CheckNicknameSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
	);
};
