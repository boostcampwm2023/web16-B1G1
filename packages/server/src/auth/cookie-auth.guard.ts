import {
	Injectable,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { RedisRepository } from './redis.repository';
import { createJwt } from '../util/auth.util';
import { JwtEnum } from './enums/jwt.enum';
import { cookieOptionsConfig } from '../config/cookie.config';

@Injectable()
export class CookieAuthGuard extends AuthGuard('jwt') {
	constructor(
		private readonly jwtService: JwtService,
		private readonly redisRepository: RedisRepository,
	) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const response = context.switchToHttp().getResponse();

		if (!request.cookies) {
			throw new UnauthorizedException('login is required');
		}

		const accessToken = request.cookies['accessToken'];
		try {
			const { userId, username, nickname, status } =
				this.jwtService.verify(accessToken);

			request.user = { userId, username, nickname, status };
			return true;
		} catch (error) {}

		const refreshToken = request.cookies['refreshToken'];
		try {
			const { userId, username, nickname, status } =
				this.jwtService.verify(refreshToken);
			request.user = { userId, username, nickname, status };
		} catch (error) {
			response.clearCookie(
				JwtEnum.ACCESS_TOKEN_COOKIE_NAME,
				cookieOptionsConfig,
			);
			response.clearCookie(
				JwtEnum.REFRESH_TOKEN_COOKIE_NAME,
				cookieOptionsConfig,
			);
			throw new UnauthorizedException('login is required');
		}

		if (
			!(await this.redisRepository.checkRefreshToken(
				request.user.username,
				refreshToken,
			))
		) {
			response.clearCookie(
				JwtEnum.ACCESS_TOKEN_COOKIE_NAME,
				cookieOptionsConfig,
			);
			response.clearCookie(
				JwtEnum.REFRESH_TOKEN_COOKIE_NAME,
				cookieOptionsConfig,
			);
			throw new UnauthorizedException('login is required');
		}

		const newAccessToken = await createJwt(
			{
				id: request.user.userId,
				username: request.user.username,
				nickname: request.user.nickname,
				status: request.user.status,
			},
			JwtEnum.ACCESS_TOKEN_TYPE,
			this.jwtService,
		);
		response.cookie(
			JwtEnum.ACCESS_TOKEN_COOKIE_NAME,
			newAccessToken,
			cookieOptionsConfig,
		);
		return true;
	}
}
