import { Injectable } from '@nestjs/common';
import { UpdateGalaxyDto } from './dto/update-galaxy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Galaxy } from './schemas/galaxy.schema';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class GalaxyService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectModel(Galaxy.name)
		private readonly galaxyModel: Model<Galaxy>,
	) {}

	async findGalaxyByNickname(nickname: string) {
		return { nickname };
	}

	async updateGalaxyMine(updateGalaxyDto: UpdateGalaxyDto, userData: any) {
		return { updateGalaxyDto, userData };
	}
}
