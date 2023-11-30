import { applyDecorators } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '로그인',
	description: 'username, password를 받아 로그인을 진행합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '로그인이 성공해 쿠키에 토큰이 저장됨',
};

const apiUnauthorizedResponse = {
	status: 401,
	description: '잘못된 유저 정보로 로그인 실패',
};

export const SignInSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiUnauthorizedResponse(apiUnauthorizedResponse),
	);
};
