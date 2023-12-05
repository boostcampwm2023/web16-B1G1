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
	UseInterceptors,
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
import { ChangeStatusSwaggerDecorator } from './decorators/swagger/change-status-swagger.decorator';
import { GetShareLinkSwaggerDecorator } from './decorators/swagger/get-share-link-swagger.decorator';
import { LogInterceptor } from '../interceptor/log.interceptor';
import { CheckSignInSwaggerDecorator } from './decorators/swagger/check-sign-in-swagger.decorator';
import { cookieOptionsConfig } from '../config/cookie.config';
import { GetUsernameByShareLinkSwaggerDecorator } from './decorators/swagger/get-username-by-sharelink.decorator';

@Controller('auth')
@UseInterceptors(LogInterceptor)
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
		res.cookie(
			JwtEnum.ACCESS_TOKEN_COOKIE_NAME,
			tokens.accessToken,
			cookieOptionsConfig,
		);
		res.cookie(
			JwtEnum.REFRESH_TOKEN_COOKIE_NAME,
			tokens.refreshToken,
			cookieOptionsConfig,
		);

		return tokens;
	}

	@Get('check-signin')
	@UseGuards(CookieAuthGuard)
	@CheckSignInSwaggerDecorator()
	async checkSignIn(@GetUser() userData: UserDataDto) {
		const user = await this.authService.findUserById(userData.userId);
		return user;
	}

	@Get('signout')
	@UseGuards(CookieAuthGuard)
	@SignOutSwaggerDecorator()
	async signOut(
		@Res({ passthrough: true }) res: Response,
		@GetUser() userData: UserDataDto,
	) {
		await this.authService.signOut(userData);
		res.clearCookie(JwtEnum.ACCESS_TOKEN_COOKIE_NAME, cookieOptionsConfig);
		res.clearCookie(JwtEnum.REFRESH_TOKEN_COOKIE_NAME, cookieOptionsConfig);
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
			res.cookie(`${service}Username`, username, cookieOptionsConfig);
			return { username };
		}

		res.cookie(
			JwtEnum.ACCESS_TOKEN_COOKIE_NAME,
			accessToken,
			cookieOptionsConfig,
		);
		res.cookie(
			JwtEnum.REFRESH_TOKEN_COOKIE_NAME,
			refreshToken,
			cookieOptionsConfig,
		);

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

		res.clearCookie(`${service}Username`, cookieOptionsConfig);

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
	@ChangeStatusSwaggerDecorator()
	changeStatus(
		@GetUser() userData: UserDataDto,
		@Body('status', StatusValidationPipe) status: UserShareStatus,
	) {
		return this.authService.changeStatus(userData, status);
	}

	@Get('sharelink')
	@GetShareLinkSwaggerDecorator()
	getShareLinkByNickname(@Query('nickname') nickname: string) {
		return this.authService.getShareLinkByNickname(nickname);
	}

	@Get('sharelink/:shareLink')
	@GetUsernameByShareLinkSwaggerDecorator()
	getUsernameByShareLink(@Param('shareLink') shareLink: string) {
		return this.authService.getUsernameByShareLink(shareLink);
	}
}
