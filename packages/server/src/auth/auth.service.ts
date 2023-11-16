import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private authRepository: Repository<User>,
	) {}

	async signUp(createUserDto: CreateUserDto): Promise<Partial<User>> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

		const newUser = this.authRepository.create({
			...createUserDto,
			password: hashedPassword,
		});

		const createdUser: User = await this.authRepository.save(newUser);
		createdUser.password = undefined;

		return createdUser;
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
