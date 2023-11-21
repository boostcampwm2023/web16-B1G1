import { User } from '../auth/entities/user.entity';

export function createJwtPayload(user: User, type: string) {
	return {
		userId: user.id,
		username: user.username,
		nickname: user.nickname,
		type,
	};
}
