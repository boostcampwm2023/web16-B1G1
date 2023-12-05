import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '공유 링크 가져오기',
	description:
		'공유 링크를 가져옵니다.\n' +
		'쿼리스트링에 nickname={닉네임}을 넣어주세요.',
};

const apiOkResponse = {
	status: 200,
	description: '공유 링크 가져오기 성공',
};

const apiBadRequestResponse = {
	status: 400,
	description: '쿼리스트링에 nickname을 입력하지 않음',
};

const apiNotFoundResponse = {
	status: 404,
	description: 'nickname에 해당하는 유저가 존재하지 않음',
};

export const GetShareLinkSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
	);
};
