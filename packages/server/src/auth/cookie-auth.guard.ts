import {
	Injectable,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { RedisRepository } from './redis.repository';
import { createJwt } from '../utils/auth.util';
import { JwtEnum } from './enums/jwt.enum';

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
			throw new UnauthorizedException('로그인이 필요합니다.');
		}

		const accessToken = request.cookies['accessToken'];
		try {
			const { userId, username, nickname } =
				this.jwtService.verify(accessToken);

			request.user = { userId, username, nickname };
			return true;
		} catch (error) {}

		const refreshToken = request.cookies['refreshToken'];
		try {
			const { userId, username, nickname } =
				this.jwtService.verify(refreshToken);
			request.user = { userId, username, nickname };
		} catch (error) {
			response.clearCookie(JwtEnum.ACCESS_TOKEN_COOKIE_NAME);
			response.clearCookie(JwtEnum.REFRESH_TOKEN_COOKIE_NAME);
			throw new UnauthorizedException('로그인이 필요합니다.');
		}

		if (
			!(await this.redisRepository.checkRefreshToken(
				request.user.username,
				refreshToken,
			))
		) {
			response.clearCookie(JwtEnum.ACCESS_TOKEN_COOKIE_NAME);
			response.clearCookie(JwtEnum.REFRESH_TOKEN_COOKIE_NAME);
			throw new UnauthorizedException('로그인이 필요합니다.');
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
		response.cookie(JwtEnum.ACCESS_TOKEN_COOKIE_NAME, newAccessToken, {
			path: '/',
			httpOnly: true,
		});
		return true;
	}
}
