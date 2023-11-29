import {
	Controller,
	Get,
	Post,
	Body,
	HttpCode,
	Res,
	Query,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Req,
	UnauthorizedException,
	Param,
	NotFoundException,
	BadRequestException,
	Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
import { SignInUserDto } from './dto/signin-user.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { JwtEnum } from './enums/jwt.enum';
import { CookieAuthGuard } from './cookie-auth.guard';
import { UserEnum, UserShareStatus } from './enums/user.enum';
import { SignUpSwaggerDecorator } from './decorators/swagger/sign-up-swagger.decorator';
import { SignInSwaggerDecorator } from './decorators/swagger/sign-in-swagger.decorator';
import { SignOutSwaggerDecorator } from './decorators/swagger/sign-out-swagger.decorator';
import { IsAvailableUsernameSwaggerDecorator } from './decorators/swagger/is-available-username-swagger.decorator';
import { IsAvailableNicknameSwaggerDecorator } from './decorators/swagger/is-available-nickname-swagger.decorator';
import { SignInWithOAuthSwaggerDecorator } from './decorators/swagger/sign-in-with-oauth-swagger.decorator';
import { SignUpWithOAuthSwaggerDecorator } from './decorators/swagger/sign-up-with-oauth-swagger.decorator';
import { OAuthCallbackSwaggerDecorator } from './decorators/swagger/oauth-callback-swagger.decorator';
import { SearchUserSwaggerDecorator } from './decorators/swagger/search-user-swagger.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { UserDataDto } from './dto/user-data.dto';
import { StatusValidationPipe } from './pipes/StatusValidationPipe';

@Controller('auth')
@ApiTags('인증/인가 API')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@UsePipes(ValidationPipe)
	@SignUpSwaggerDecorator()
	signUp(@Body() signUpUserDto: SignUpUserDto): Promise<Partial<User>> {
		return this.authService.signUp(signUpUserDto);
	}

	@Post('signin')
	@HttpCode(200)
	@SignInSwaggerDecorator()
	async signIn(
		@Body() signInUserDto: SignInUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const tokens = await this.authService.signIn(signInUserDto);
		res.cookie(JwtEnum.ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		res.cookie(JwtEnum.REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});

		return tokens;
	}

	@Get('signout')
	@UseGuards(CookieAuthGuard)
	@SignOutSwaggerDecorator()
	async signOut(
		@Res({ passthrough: true }) res: Response,
		@GetUser() userData: UserDataDto,
	) {
		await this.authService.signOut(userData);
		res.clearCookie(JwtEnum.ACCESS_TOKEN_COOKIE_NAME, {
			path: '/',
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		res.clearCookie(JwtEnum.REFRESH_TOKEN_COOKIE_NAME, {
			path: '/',
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		return { message: UserEnum.SUCCESS_SIGNOUT_MESSAGE };
	}

	@Get('is-available-username')
	@IsAvailableUsernameSwaggerDecorator()
	isAvailableUsername(@Query('username') username: string) {
		return this.authService.isAvailableUsername(username);
	}

	@Get('is-available-nickname')
	@IsAvailableNicknameSwaggerDecorator()
	isAvailableNickname(@Query('nickname') nickname: string) {
		return this.authService.isAvailableNickname(nickname);
	}

	@Get(':service/signin')
	@SignInWithOAuthSwaggerDecorator()
	signInWithOAuth(
		@Param('service') service: string,
		@Res({ passthrough: true }) res: Response,
	) {
		let redirectUrl: string;
		switch (service) {
			case 'github':
				redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_GITHUB_CLIENT_ID}&scope=read:user%20user:email`;
				break;
			case 'naver':
				redirectUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.OAUTH_NAVER_CLIENT_ID}&redirect_uri=${process.env.OAUTH_NAVER_REDIRECT_URI}&state=STATE_STRING`;
				break;
			case 'google':
				redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.OAUTH_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.OAUTH_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`;
				break;
			default:
				throw new NotFoundException('존재하지 않는 서비스입니다.');
		}
		res.redirect(redirectUrl);
	}

	@Get(':service/callback')
	@OAuthCallbackSwaggerDecorator()
	async oauthCallback(
		@Param('service') service: string,
		@Query('code') authorizedCode: string,
		@Query('state') state: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const { username, accessToken, refreshToken } =
			await this.authService.oauthCallback(service, authorizedCode, state);

		if (username) {
			res.cookie(`${service}Username`, username, {
				path: '/',
				httpOnly: true,
			});
			return { username };
		}

		res.cookie(JwtEnum.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
			path: '/',
			httpOnly: true,
		});
		res.cookie(JwtEnum.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
			path: '/',
			httpOnly: true,
		});

		return { accessToken, refreshToken };
	}

	@Post(':service/signup')
	@SignUpWithOAuthSwaggerDecorator()
	async signUpWithOAuth(
		@Param('service') service: string,
		@Body('nickname') nickname: string,
		@Req() req,
		@Res({ passthrough: true }) res: Response,
	) {
		let resourceServerUsername: string;
		try {
			resourceServerUsername = req.cookies[`${service}Username`];
		} catch (e) {
			throw new UnauthorizedException('잘못된 접근입니다.');
		}

		const savedUser = await this.authService.signUpWithOAuth(
			service,
			nickname,
			resourceServerUsername,
		);

		res.clearCookie(`${service}Username`, {
			path: '/',
			httpOnly: true,
		});

		return savedUser;
	}

	@Get('search')
	@SearchUserSwaggerDecorator()
	searchUser(@Query('nickname') nickname: string) {
		if (!nickname) {
			throw new BadRequestException('검색할 닉네임을 입력해주세요.');
		}
		return this.authService.searchUser(nickname);
	}

	@Patch('status')
	@UseGuards(CookieAuthGuard)
	changeStatus(
		@GetUser() userData: UserDataDto,
		@Body('status', StatusValidationPipe) status: UserShareStatus,
	) {
		return this.authService.changeStatus(userData, status);
	}

	@Get('sharelink')
	@UseGuards(CookieAuthGuard)
	getShareLink(@GetUser() userData: UserDataDto) {
		return this.authService.getShareLink(userData);
	}
}
