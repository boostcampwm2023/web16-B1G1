import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';

const apiOperation = {
	summary: '로그인한 사용자의 은하 스타일 업데이트',
	description: '로그인한 사용자의 은하 스타일을 업데이트합니다.',
};

const apiOkResponse = {
	status: 200,
	description: '로그인한 사용자의 은하 스타일 업데이트 성공',
};

const apiBadRequestResponse = {
	status: 400,
	description:
		'잘못된 요청(변경할 내용 없음 등)으로 로그인한 사용자의 은하 스타일 업데이트 실패',
};

const apiNotFoundResponse = {
	status: 404,
	description: '로그인한 사용자의 사용자 정보나 은하 스타일이 존재하지 않음',
};

const apiInternalServerErrorResponse = {
	status: 500,
	description: '서버 오류로 로그인한 사용자의 은하 스타일 업데이트 실패',
};

export const UpdateGalaxyMineSwaggerDecorator = () => {
	return applyDecorators(
		ApiOperation(apiOperation),
		ApiOkResponse(apiOkResponse),
		ApiBadRequestResponse(apiBadRequestResponse),
		ApiNotFoundResponse(apiNotFoundResponse),
		ApiInternalServerErrorResponse(apiInternalServerErrorResponse),
	);
};
