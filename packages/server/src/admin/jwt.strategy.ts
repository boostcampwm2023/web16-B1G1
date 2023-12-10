import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			secretOrKey: jwtConfig.secret,
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req) => req.cookies?.adminAccessToken,
			]),
		});
	}

	async validate(payload: { admin: boolean }) {
		return payload.admin;
	}
}
