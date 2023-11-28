import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '내가 쓴 글 목록 조회',
	description: '내가 쓴 글 목록을 조회합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '내가 쓴 글 목록 조회 성공',
};

const apiBadRequestResponse = {
	status: 400,
	description: '잘못된 요청으로 내가 쓴 글 목록 조회 실패',
};

export const FindAllStarsMineSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
	);
};
