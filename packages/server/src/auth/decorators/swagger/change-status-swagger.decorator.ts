import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '사용자 공개 상태 변경',
	description: '사용자 공개 상태를 변경합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '공개 상태 변경 성공',
};

const apiBadRequestResponse = {
	status: 400,
	description:
		'status값을 지정해주지 않았거나 올바르지 않은 status값 요청으로 공개 상태 변경 실패',
};

const apiNotFoundResponse = {
	status: 404,
	description: '사용자를 찾을 수 없어 공개 상태 변경 실패',
};

export const ChangeStatusSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
	);
};
