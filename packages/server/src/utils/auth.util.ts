import { User } from '../auth/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtEnum } from '../auth/enums/jwt.enum';
import {
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';

export async function createJwt(
	user: Partial<User>,
	type: string,
	jwtService: JwtService,
) {
	const payload = {
		userId: user.id,
		username: user.username,
		nickname: user.nickname,
		type,
	};
	const jwt = await jwtService.sign(payload, {
		expiresIn: type === JwtEnum.ACCESS_TOKEN_TYPE ? '1h' : '1d',
	});
	return jwt;
}

export async function getOAuthAccessToken(
	service: string,
	authorizedCode: string,
	state?: string,
) {
	const [urlForAccessToken, requestData] = getOAuthAccessTokenRequestData(
		service,
		authorizedCode,
		state,
	);
	const accessTokenResponse = await fetch(urlForAccessToken, requestData);

	if (!accessTokenResponse.ok) {
		throw new InternalServerErrorException(
			`${service}으로부터 accessToken을 받아오지 못했습니다.`,
		);
	}

	const accessTokenData = await accessTokenResponse.json();
	return accessTokenData.access_token;
}

export async function getOAuthUserData(service: string, accessToken: string) {
	const [urlForUserData, requestData] = getOAuthUserDataRequestData(
		service,
		accessToken,
	);
	const userResponse = await fetch(urlForUserData, requestData);

	if (!userResponse.ok) {
		throw new InternalServerErrorException(
			`${service}으로부터 유저 정보를 받아오지 못했습니다.`,
		);
	}

	const userData = await userResponse.json();
	switch (service) {
		case 'github':
			return userData.login;
		case 'naver':
			return userData.response.id;
		default:
			throw new NotFoundException('존재하지 않는 서비스입니다.');
	}
}

function getOAuthAccessTokenRequestData(
	service: string,
	authorizedCode: string,
	state?: string,
) {
	let urlForAccessToken: string;
	let requestData: any;
	switch (service) {
		case 'github':
			urlForAccessToken = 'https://github.com/login/oauth/access_token';
			requestData = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
					client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRETS,
					code: authorizedCode,
				}),
			};
			break;
		case 'naver':
			urlForAccessToken = 'https://nid.naver.com/oauth2.0/token';
			requestData = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					client_id: process.env.OAUTH_NAVER_CLIENT_ID,
					client_secret: process.env.OAUTH_NAVER_CLIENT_SECRETS,
					code: authorizedCode,
					state,
				}),
			};
			break;
		default:
			throw new NotFoundException('존재하지 않는 서비스입니다.');
	}
	return [urlForAccessToken, requestData];
}

function getOAuthUserDataRequestData(service: string, accessToken: string) {
	let urlForUserData: string;
	let requestData: any;
	switch (service) {
		case 'github':
			urlForUserData = 'https://api.github.com/user';
			requestData = {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};
			break;
		case 'naver':
			urlForUserData = 'https://openapi.naver.com/v1/nid/me';
			requestData = {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};
			break;
		default:
			throw new NotFoundException('존재하지 않는 서비스입니다.');
	}
	return [urlForUserData, requestData];
}
