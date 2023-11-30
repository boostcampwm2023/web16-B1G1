import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

const apiOperation = {
	summary: 'OAuth 로그인 콜백',
	description:
		'OAuth 로그인 콜백을 진행합니다.\n' + '서버 내부에서만 동작하는 API입니다.',
};

export const OAuthCallbackSwaggerDecorator = () => {
	return applyDecorators(ApiOperation(apiOperation));
};
