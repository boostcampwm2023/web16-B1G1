import { applyDecorators } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const apiOperation = {
	summary: 'OAuth를 통한 회원가입',
	description:
		'OAuth를 통한 첫 로그인인 경우 회원가입을 진행합니다.\n' +
		'signin을 통해 발급 받은 쿠키의 {서비스명}Username을 이용해 회원가입을 진행합니다.\n' +
		'Post 요청 body에 nickname 정보를 담아 요청해야 합니다.',
};

const apiCreatedResponse = {
	status: 201,
	description: 'OAuth를 통한 회원가입 성공',
};

const apiUnauthorizedResponse = {
	status: 401,
	description:
		'쿠키에 Username이 없거나 Redis에 저장된 정보가 없음(OAuth signin을 하지 않았음)',
};

export const SignUpWithOAuthSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiCreatedResponse(apiCreatedResponse),
		ApiUnauthorizedResponse(apiUnauthorizedResponse),
	);
};
