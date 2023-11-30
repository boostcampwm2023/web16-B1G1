import { applyDecorators } from '@nestjs/common';
import {
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '게시글 상세 조회',
	description: '게시글을 상세 조회합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '게시글 상세 조회 성공',
};

const apiNotFoundResponse = {
	status: 404,
	description: '게시글이 존재하지 않음',
};

const apiInternalServerErrorResponse = {
	status: 500,
	description: '서버 오류',
};

export const FindBoardByIdSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
		ApiInternalServerErrorResponse(apiInternalServerErrorResponse),
	);
};
