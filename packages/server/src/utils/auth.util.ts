import { User } from '../auth/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtEnum } from '../auth/enums/jwt.enum';
import { InternalServerErrorException } from '@nestjs/common';

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

export async function getGitHubAccessToken(authorizedCode: string) {
	const accessTokenResponse = await fetch(
		'https://github.com/login/oauth/access_token',
		{
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
		},
	);

	if (!accessTokenResponse.ok) {
		throw new InternalServerErrorException(
			'GitHub으로부터 accessToken을 받아오지 못했습니다.',
		);
	}

	const accessTokenData = await accessTokenResponse.json();
	return accessTokenData.access_token;
}

export async function getGitHubUserData(accessToken: string) {
	const userResponse = await fetch('https://api.github.com/user', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!userResponse.ok) {
		throw new InternalServerErrorException(
			'GitHub으로부터 유저 정보를 받아오지 못했습니다.',
		);
	}

	const userData = await userResponse.json();
	return {
		username: userData.login,
	};
}

export async function getNaverAccessToken(
	authorizedCode: string,
	state: string,
) {
	const accessTokenResponse = await fetch(
		'https://nid.naver.com/oauth2.0/token',
		{
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
		},
	);

	if (!accessTokenResponse.ok) {
		throw new InternalServerErrorException(
			'Naver로부터 accessToken을 받아오지 못했습니다.',
		);
	}

	const accessTokenData = await accessTokenResponse.json();
	return accessTokenData.access_token;
}

export async function getNaverUserData(accessToken: string) {
	const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!userResponse.ok) {
		throw new InternalServerErrorException(
			'Naver로부터 유저 정보를 받아오지 못했습니다.',
		);
	}

	const userData = await userResponse.json();
	return {
		username: userData.response.id,
	};
}
