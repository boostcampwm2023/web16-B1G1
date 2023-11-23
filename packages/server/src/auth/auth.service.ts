import {
	BadRequestException,
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcryptjs';
import { SignInUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisRepository } from './redis.repository';
import { UserEnum } from './enums/user.enum';
import { JwtEnum } from './enums/jwt.enum';
import {
	createJwt,
	getGitHubAccessToken,
	getGitHubUserData,
	getNaverAccessToken,
	getNaverUserData,
} from '../utils/auth.util';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly authRepository: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly redisRepository: RedisRepository,
	) {}

	async signUp(signUpUserDto: SignUpUserDto): Promise<Partial<User>> {
		const { username, nickname } = signUpUserDto;
		await Promise.all([
			this.isAvailableNickname(nickname),
			this.isAvailableUsername(username),
		]);

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(signUpUserDto.password, salt);

		const newUser = this.authRepository.create({
			...signUpUserDto,
			password: hashedPassword,
		});

		const savedUser: User = await this.authRepository.save(newUser);
		savedUser.password = undefined;

		return savedUser;
	}

	async signIn(signInUserDto: SignInUserDto) {
		const { username, password } = signInUserDto;

		const user = await this.authRepository.findOneBy({ username });

		if (!(user && (await bcrypt.compare(password, user.password)))) {
			throw new UnauthorizedException(UserEnum.FAIL_SIGNIN_MESSAGE);
		}

		const [accessToken, refreshToken] = await Promise.all([
			createJwt(user, JwtEnum.ACCESS_TOKEN_TYPE, this.jwtService),
			createJwt(user, JwtEnum.REFRESH_TOKEN_TYPE, this.jwtService),
		]);

		this.redisRepository.set(username, refreshToken);

		return { accessToken, refreshToken };
	}

	async signOut(user: Partial<User>) {
		this.redisRepository.del(user.username);
	}

	async isAvailableUsername(username: string): Promise<boolean> {
		if (!username) {
			throw new BadRequestException('username is required');
		}

		const user = await this.authRepository.findOneBy({ username });

		if (user) {
			throw new ConflictException('username already exists');
		} else {
			return true;
		}
	}

	async isAvailableNickname(nickname: string): Promise<boolean> {
		if (!nickname) {
			throw new BadRequestException('nickname is required');
		}

		const user = await this.authRepository.findOneBy({ nickname });

		if (user) {
			throw new ConflictException('nickname already exists');
		} else {
			return true;
		}
	}

	async oauthGithubCallback(authorizedCode: string) {
		if (!authorizedCode) {
			throw new BadRequestException('Authorized Code가 존재하지 않습니다.');
		}

		const gitHubAccessToken = await getGitHubAccessToken(authorizedCode);
		const gitHubUser = await getGitHubUserData(gitHubAccessToken);

		const user = await this.authRepository.findOneBy({
			username: gitHubUser.username,
		});

		if (!user) {
			this.redisRepository.set(gitHubUser.username, gitHubAccessToken);
			return {
				username: gitHubUser.username,
				accessToken: null,
				refreshToken: null,
			};
		}

		const [accessToken, refreshToken] = await Promise.all([
			createJwt(user, JwtEnum.ACCESS_TOKEN_TYPE, this.jwtService),
			createJwt(user, JwtEnum.REFRESH_TOKEN_TYPE, this.jwtService),
		]);

		this.redisRepository.set(user.username, refreshToken);

		return {
			username: null,
			accessToken,
			refreshToken,
		};
	}

	async signUpWithGithub(nickname: string, GitHubUsername: any) {
		let gitHubUserData;
		try {
			const gitHubAccessToken = await this.redisRepository.get(GitHubUsername);
			gitHubUserData = await getGitHubUserData(gitHubAccessToken);
		} catch (e) {
			throw new UnauthorizedException('잘못된 접근입니다.');
		}

		if (gitHubUserData.username !== GitHubUsername) {
			throw new UnauthorizedException('잘못된 접근입니다.');
		}

		this.redisRepository.del(GitHubUsername);

		const newUser = this.authRepository.create({
			username: GitHubUsername,
			password: uuid(),
			nickname,
		});

		const savedUser: User = await this.authRepository.save(newUser);
		savedUser.password = undefined;

		return savedUser;
	}

	async oauthNaverCallback(authorizedCode: string, state: string) {
		const naverAccessToken = await getNaverAccessToken(authorizedCode, state);
		const naverUser = await getNaverUserData(naverAccessToken);

		const user = await this.authRepository.findOneBy({
			username: naverUser.username,
		});

		if (!user) {
			this.redisRepository.set(naverUser.username, naverAccessToken);
			return {
				username: naverUser.username,
				accessToken: null,
				refreshToken: null,
			};
		}

		const [accessToken, refreshToken] = await Promise.all([
			createJwt(user, JwtEnum.ACCESS_TOKEN_TYPE, this.jwtService),
			createJwt(user, JwtEnum.REFRESH_TOKEN_TYPE, this.jwtService),
		]);

		this.redisRepository.set(user.username, refreshToken);

		return {
			username: null,
			accessToken,
			refreshToken,
		};
	}
}
