import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

const apiOperation = {
	summary: 'OAuth 로그인',
	description:
		'OAuth 로그인을 진행합니다.\n' +
		'OAuth 로그인은 Google, Naver, GitHub을 지원합니다.\n' +
		'/api/auth/{서비스명}/signin으로 요청하면 해당 서비스의 OAuth 로그인 페이지로 리다이렉트됩니다.\n' +
		'서비스 명에는 google, naver, github 중 하나를 입력해야 합니다.',
};

export const SignInWithOAuthSwaggerDecorator = () => {
	return applyDecorators(ApiOperation(apiOperation));
};
