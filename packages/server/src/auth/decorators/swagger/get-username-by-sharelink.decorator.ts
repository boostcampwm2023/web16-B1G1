import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '해당 공유링크를 가진 사용자의 닉네임 조회',
	description: '해당 공유링크를 가진 사용자의 닉네임을 리턴합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '해당 공유링크를 가진 사용자의 닉네임 조회 성공',
};

const apiBadRequestResponse = {
	status: 400,
	description: '해당 공유링크를 가진 사용자가 없음',
};

const apiUnauthorizedResponse = {
	status: 401,
	description: '해당 유저는 비공개상태임',
};

const apiInternalServerErrorResponse = {
	status: 500,
	description: '링크에 대한 사용자가 존재하지 않음',
};

export const GetUsernameByShareLinkSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiUnauthorizedResponse(apiUnauthorizedResponse),
		ApiInternalServerErrorResponse(apiInternalServerErrorResponse),
	);
};
//
