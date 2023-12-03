import { CookieOptions } from 'express';

export const cookieOptionsConfig: CookieOptions = {
	path: '/',
	httpOnly: true,
	sameSite: 'none',
	secure: true,
};
