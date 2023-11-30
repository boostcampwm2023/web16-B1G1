import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConsumes,
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

const apiConsumes = 'multipart/form-data';

const apiBody = {
	schema: {
		type: 'object',
		properties: {
			title: {
				type: 'string',
				description: '게시글 제목',
				example: 'test title',
			},
			content: {
				type: 'string',
				description: '게시글 내용',
				example: 'test content',
			},
			file: {
				type: 'file',
				description: '첨부 파일 (이미지)',
				example: 'test.png',
			},
		},
	},
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
		ApiConsumes(apiConsumes),
		ApiBody(apiBody),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiUnauthorizedResponse(apiUnauthorizedResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
		ApiInternalServerErrorResponse(apiInternalServerErrorResponse),
	);
};
