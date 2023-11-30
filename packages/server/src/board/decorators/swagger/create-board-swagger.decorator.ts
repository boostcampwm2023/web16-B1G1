import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConsumes,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '별글 생성',
	description: '별글을 생성합니다.',
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
			star: {
				type: 'string',
				description: '별 스타일',
				example: '{"color":"#000000", "position":{ "x": 50, "y": 0, "z": -50}}',
			},
			file: {
				type: 'file',
				description: '첨부 파일 (이미지)',
				example: 'test.png',
			},
		},
	},
};

const apiCreatedResponse = {
	status: 201,
	description: '게시글 생성 성공',
};

const apiUnauthorizedResponse = {
	status: 401,
	description: '권한이 없음',
};

const apiBadRequestResponse = {
	status: 400,
	description: '잘못된 요청으로 게시글 생성 실패',
};

const apiInternalServerErrorResponse = {
	status: 500,
	description: '서버 오류',
};

export const CreateBoardSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiConsumes(apiConsumes),
		ApiBody(apiBody),
		ApiCreatedResponse(apiCreatedResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiUnauthorizedResponse(apiUnauthorizedResponse),
		ApiInternalServerErrorResponse(apiInternalServerErrorResponse),
	);
};
