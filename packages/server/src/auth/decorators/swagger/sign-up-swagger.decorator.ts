import { applyDecorators } from '@nestjs/common';
import {
	ApiOperation,
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '회원가입',
	description: 'username, password, nickname을 받아 회원 가입을 진행합니다.',
};

const apiCreatedResponse = {
	status: 201,
	description: '회원가입 완료로 회원 정보가 데이터베이스에 저장됨',
};

const apiBadRequestResponse = {
	status: 400,
	description: '회원 가입에 필요한 정보들이 형식에 맞지 않음',
};

const apiConflictResponse = {
	status: 409,
	description: '이미 존재하는 username 또는 nickname이 사용됨',
};

export const SignUpSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiCreatedResponse(apiCreatedResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiConflictResponse(apiConflictResponse),
	);
};
