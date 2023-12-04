import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '로그인한 사용자의 은하 스타일 조회',
	description: '로그인한 사용자의 은하 스타일을 조회합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '로그인한 사용자의 은하 스타일 조회 성공',
};

const apiBadRequestResponse = {
	status: 400,
	description: '잘못된 요청으로 로그인한 사용자의 은하 스타일 조회 실패',
};

const apiNotFoundResponse = {
	status: 404,
	description: '로그인한 사용자의 은하 스타일이 존재하지 않음',
};

export const FindGalaxyMineSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
	);
};
