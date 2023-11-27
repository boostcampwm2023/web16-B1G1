import { applyDecorators } from '@nestjs/common';
import {
	ApiOperation,
	ApiBadRequestResponse,
	ApiCreatedResponse,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '로그아웃',
	description: '쿠키의 토큰을 읽어 해당 회원의 로그아웃을 진행합니다.',
};

const apiCreatedResponse = {
	status: 200,
	description: '로그아웃 성공으로 쿠키의 토큰과 Redis의 토큰 정보가 삭제됨',
};

const apiBadRequestResponse = {
	status: 400,
	description: '쿠키에 토큰이 없음(로그인 하지 않은 회원)',
};

export const SignOutSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiCreatedResponse(apiCreatedResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
	);
};
