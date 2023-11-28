import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '별 스타일 수정',
	description: '별 스타일을 수정합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '별 스타일 수정 성공',
};

const apiBadRequestResponse = {
	status: 400,
	description: '잘못된 요청으로 별 스타일 수정 실패',
};

const apiNotFoundResponse = {
	status: 404,
	description: '게시글 id에 해당하는 게시글이 존재하지 않음',
};

const apiInternalServerErrorResponse = {
	status: 500,
	description: '서버 오류',
};

export const UpdateStarByPostIdSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
		ApiInternalServerErrorResponse(apiInternalServerErrorResponse),
	);
};
