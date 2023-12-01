import { applyDecorators } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '로그인 여부 확인',
	description: '로그인 여부를 확인합니다.',
};

const apiOkResponse = {
	status: 200,
	description:
		'로그인 한 사용자가 맞음\n' + '응답으로 사용자 정보를 반환합니다.',
};

const apiUnauthorizedResponse = {
	status: 401,
	description: '로그인 하지 않은 사용자임',
};

export const CheckSignInSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiUnauthorizedResponse(apiUnauthorizedResponse),
	);
};
