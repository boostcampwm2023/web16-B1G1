import { applyDecorators } from '@nestjs/common';
import {
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '게시글 좋아요 여부 조회',
	description:
		'로그인한 사용자가 해당 게시글에 좋아요를 눌렀는지 여부를 조회합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '게시글 좋아요 여부 조회 성공',
};

const apiUnauthorizedResponse = {
	status: 401,
	description: '로그인하지 않은 사용자',
};

const apiNotFoundResponse = {
	status: 404,
	description: '게시글이 존재하지 않음',
};

const apiInternalServerErrorResponse = {
	status: 500,
	description: '서버 오류',
};

export const GetIsLikedSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiUnauthorizedResponse(apiUnauthorizedResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
		ApiInternalServerErrorResponse(apiInternalServerErrorResponse),
	);
};
