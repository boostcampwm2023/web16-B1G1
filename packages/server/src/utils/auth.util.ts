import { User } from '../auth/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtEnum } from '../auth/enums/jwt.enum';

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
		expiresIn: type === JwtEnum.ACCESS_TOKEN_TYPE ? '1h' : '7d',
	});
	return jwt;
}
