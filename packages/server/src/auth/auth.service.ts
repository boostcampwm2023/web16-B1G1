import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private authRepository: Repository<User>,
		private jwtService: JwtService,
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

	findAll() {
		return `This action returns all auth`;
	}

	findOne(id: number) {
		return `This action returns a #${id} auth`;
	}

	update(id: number, updateAuthDto: UpdateUserDto) {
		return `This action updates a #${id} auth`;
	}

	remove(id: number) {
		return `This action removes a #${id} auth`;
	}
}
