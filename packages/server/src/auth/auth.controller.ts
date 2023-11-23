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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { User } from './entities/user.entity';
import { SignInUserDto } from './dto/signin-user.dto';
import { Response } from 'express';
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtEnum } from './enums/jwt.enum';
import { CookieAuthGuard } from './cookie-auth.guard';
import { UserEnum } from './enums/user.enum';

@Controller('auth')
@ApiTags('인증/인가 API')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: '회원가입', description: '회원가입을 진행합니다.' })
	@ApiCreatedResponse({ status: 201, description: '회원가입 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 회원가입 실패',
	})
	signUp(@Body() signUpUserDto: SignUpUserDto): Promise<Partial<User>> {
		return this.authService.signUp(signUpUserDto);
	}

	@Post('signin')
	@HttpCode(200)
	@ApiOperation({ summary: '로그인', description: '로그인을 진행합니다.' })
	@ApiOkResponse({ status: 200, description: '로그인 성공' })
	@ApiUnauthorizedResponse({
		status: 401,
		description: '잘못된 요청으로 로그인 실패',
	})
	async signIn(
		@Body() signInUserDto: SignInUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const tokens = await this.authService.signIn(signInUserDto);
		res.cookie(JwtEnum.ACCESS_TOKEN_COOKIE_NAME, tokens.accessToken, {
			path: '/',
			httpOnly: true,
		});
		res.cookie(JwtEnum.REFRESH_TOKEN_COOKIE_NAME, tokens.refreshToken, {
			path: '/',
			httpOnly: true,
		});

		return tokens;
	}

	@Get('signout')
	@UseGuards(CookieAuthGuard)
	@ApiOperation({ summary: '로그아웃', description: '로그아웃을 진행합니다.' })
	@ApiOkResponse({ status: 200, description: '로그아웃 성공' })
	async signOut(@Res({ passthrough: true }) res: Response, @Req() req) {
		await this.authService.signOut(req.user);
		res.clearCookie(JwtEnum.ACCESS_TOKEN_COOKIE_NAME, {
			path: '/',
			httpOnly: true,
		});
		res.clearCookie(JwtEnum.REFRESH_TOKEN_COOKIE_NAME, {
			path: '/',
			httpOnly: true,
		});
		return { message: UserEnum.SUCCESS_SIGNOUT_MESSAGE };
	}

	@Get('is-available-username')
	@ApiOperation({
		summary: 'username 중복 확인',
		description: 'username 중복을 확인합니다.',
	})
	@ApiOkResponse({ status: 200, description: 'username 중복 확인 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '쿼리 스트링에 username이 없음',
	})
	@ApiConflictResponse({
		status: 409,
		description: 'username 중복',
	})
	isAvailableUsername(@Query('username') username: string) {
		return this.authService.isAvailableUsername(username);
	}

	@Get('is-available-nickname')
	@ApiOperation({
		summary: 'nickname 중복 확인',
		description: 'nickname 중복을 확인합니다.',
	})
	@ApiOkResponse({ status: 200, description: 'nickname 중복 확인 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '쿼리 스트링에 nickname이 없음',
	})
	@ApiConflictResponse({
		status: 409,
		description: 'nickname 중복',
	})
	isAvailableNickname(@Query('nickname') nickname: string) {
		return this.authService.isAvailableNickname(nickname);
	}

	@Get('github/signin')
	signInWithGithub(@Res({ passthrough: true }) res: Response) {
		res.redirect(
			`https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_GITHUB_CLIENT_ID}&scope=read:user%20user:email`,
		);
	}

	@Get('github/callback')
	async oauthGithubCallback(
		@Query('code') authorizedCode: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const { username, accessToken, refreshToken } =
			await this.authService.oauthGithubCallback(authorizedCode);

		if (username) {
			res.cookie('GitHubUsername', username, {
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

	@Post('github/signup')
	async signUpWithGithub(
		@Body('nickname') nickname: string,
		@Req() req,
		@Res({ passthrough: true }) res: Response,
	) {
		let gitHubUsername;
		try {
			gitHubUsername = req.cookies.GitHubUsername;
		} catch (e) {
			throw new UnauthorizedException('잘못된 접근입니다.');
		}

		const savedUser = await this.authService.signUpWithGithub(
			nickname,
			gitHubUsername,
		);

		res.clearCookie('GitHubUsername', {
			path: '/',
			httpOnly: true,
		});

		return savedUser;
	}

	@Get('naver/signin')
	signInWithNaver(@Res({ passthrough: true }) res: Response) {
		res.redirect(
			`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.OAUTH_NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${process.env.OAUTH_NAVER_REDIRECT_URI}`,
		);
	}

	@Get('naver/callback')
	async oauthNaverCallback(
		@Query('code') authorizedCode: string,
		@Query('state') state: string,
	) {
		const result = await this.authService.oauthNaverCallback(
			authorizedCode,
			state,
		);

		return result;
	}
}
