import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '닉네임 으로 유저 검색',
	description:
		'닉네임으로 유저를 검색합니다.\n' +
		'쿼리 스트링으로 "nickname=검색할닉네임"을 넘겨주세요\n' +
		'해당 검색 닉네임으로 시작하는 유저들을 반환합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '검색 성공',
};

const apiBadRequestResponse = {
	status: 400,
	description: '닉네임을 입력하지 않아 검색 실패',
};

export const SearchUserSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
	);
};
