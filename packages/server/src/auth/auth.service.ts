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

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly authRepository: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly redisRepository: RedisRepository,
	) {}

	async signUp(signUpUserDto: SignUpUserDto): Promise<Partial<User>> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(signUpUserDto.password, salt);

		const newUser = this.authRepository.create({
			...signUpUserDto,
			password: hashedPassword,
		});

		const createdUser: User = await this.authRepository.save(newUser);
		createdUser.password = undefined;

		return createdUser;
	}

	async signIn(signInUserDto: SignInUserDto): Promise<{ accessToken: string }> {
		const { username, password } = signInUserDto;

		const user = await this.authRepository.findOneBy({ username });

		if (user && (await bcrypt.compare(password, user.password))) {
			const payload = { username };
			const accessToken = await this.jwtService.sign(payload);

			return { accessToken };
		} else {
			throw new UnauthorizedException('login failed');
		}
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

	async getValueFromRedis(key: string) {
		return this.redisRepository.get(key);
	}

	async setValueToRedis(key: string, value: string) {
		return this.redisRepository.set(key, value);
	}
}
