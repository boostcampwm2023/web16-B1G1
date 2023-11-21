import {
	Injectable,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CookieAuthGuard extends AuthGuard('jwt') {
	constructor(private readonly jwtService: JwtService) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		try {
			const accessToken = request.cookies['accessToken'];
			const { userId, username, nickname } =
				this.jwtService.verify(accessToken);
			request.user = { userId, username, nickname };
			return true;
		} catch (error) {
			throw new UnauthorizedException('로그인이 필요합니다.');
		}
	}
}
