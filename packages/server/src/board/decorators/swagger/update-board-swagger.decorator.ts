import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '게시글 수정',
	description: '게시글을 수정합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '게시글 수정 성공',
};

const apiBadRequestResponse = {
	status: 400,
	description: '잘못된 요청으로 게시글 수정 실패',
};

const apiUnauthorizedResponse = {
	status: 401,
	description: '권한이 없음',
};

const apiNotFoundResponse = {
	status: 404,
	description: '게시글이 존재하지 않음',
};

const apiInternalServerErrorResponse = {
	status: 500,
	description: '서버 오류',
};

export const UpdateBoardSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiUnauthorizedResponse(apiUnauthorizedResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
		ApiInternalServerErrorResponse(apiInternalServerErrorResponse),
	);
};
