import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
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

	async findGalaxyByNickname(nickname: string): Promise<Galaxy> {
		// nickname이 없는 경우 에러 발생
		if (!nickname) {
			throw new BadRequestException('nickname is required');
		}

		const user = await this.userRepository.findOneBy({ nickname });
		// user가 없는 경우 에러 발생
		if (!user) {
			throw new NotFoundException('user not found');
		}

		const galaxy_id = user.galaxy;
		const galaxy = await this.galaxyModel.findOne({ _id: galaxy_id });
		// galaxy가 없는 경우 에러 발생
		if (!galaxy) {
			throw new NotFoundException('galaxy not found');
		}

		// __v 필드 제거
		galaxy['__v'] = undefined;

		return galaxy;
	}

	async updateGalaxyMine(updateGalaxyDto: UpdateGalaxyDto, userData: any) {
		const user = await this.userRepository.findOneBy({ id: userData.userId });
		// user가 없는 경우 에러 발생
		if (!user) {
			throw new NotFoundException('user not found');
		}

		// galaxy 존재하면 수정
		const galaxy_id = user.galaxy;
		const result = await this.galaxyModel.updateOne(
			{ _id: galaxy_id },
			{ ...updateGalaxyDto },
		);
		if (!result) {
			throw new InternalServerErrorException('galaxy update failed');
		} else if (result.matchedCount === 0) {
			throw new NotFoundException('galaxy not found');
		} else if (result.modifiedCount === 0) {
			throw new BadRequestException('Nothing to update');
		}

		const updatedGalaxy = await this.galaxyModel.findOne({ _id: galaxy_id });

		return updatedGalaxy;
	}
}
