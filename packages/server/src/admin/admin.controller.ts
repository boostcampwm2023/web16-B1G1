import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { cookieOptionsConfig } from 'src/config/cookie.config';

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Get('post')
	@UseGuards(AuthGuard())
	getAllPosts() {
		return this.adminService.getAllPosts();
	}

	@Get('system-info')
	@UseGuards(AuthGuard())
	getSystemInfo() {
		return this.adminService.getSystemInfo();
	}

	@Get('exception')
	@UseGuards(AuthGuard())
	getAllExceptions() {
		return this.adminService.getAllExceptions();
	}

	@Post('signin')
	@HttpCode(200)
	async signIn(
		@Body('password') password: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const { adminAccessToken } = await this.adminService.signIn(password);
		res.cookie('adminAccessToken', adminAccessToken, cookieOptionsConfig);

		return { adminAccessToken };
	}

	@Get('signout')
	async signOut(@Res({ passthrough: true }) res: Response) {
		res.clearCookie('adminAccessToken', cookieOptionsConfig);

		return { message: '어드민에서 로그아웃 되었습니다.' };
	}
}
