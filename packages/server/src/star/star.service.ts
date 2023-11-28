import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStarDto } from './dto/create-star.dto';
import { UpdateStarDto } from './dto/update-star.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Star } from './schemas/star.schema';
import { Model } from 'mongoose';
import { GetStarResDto } from './dto/get-star-res.dto';

@Injectable()
export class StarService {
	constructor(
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>,
		@InjectModel(Star.name)
		private readonly starModel: Model<Star>,
	) {}

	create(createStarDto: CreateStarDto) {
		return 'This action adds a new star';
	}

	async findAllStarsByAuthor(author: string): Promise<GetStarResDto[]> {
		// author가 없는 경우 에러 발생
		if (!author) {
			throw new BadRequestException('author is required');
		}

		const boards = await this.boardRepository
			.createQueryBuilder()
			.select(['board.id', 'board.title', 'board.star'])
			.from(Board, 'board')
			.leftJoin('board.user', 'user')
			.where('user.nickname = :nickname', { nickname: author })
			.getMany();

		const starDataList: GetStarResDto[] = [];
		for (let board of boards) {
			if (!board.star) continue;

			const star = await this.starModel.findOne({ _id: board.star });
			if (!star) continue;

			// $, _로 시작하는 모든 속성 제거
			for (let key in star) {
				if (key.startsWith('$') || key.startsWith('_')) {
					delete star[key];
				}
			}

			starDataList.push({
				id: board.id,
				...star,
				title: board.title,
			});
		}

		return starDataList;
	}

	findOne(id: number) {
		return `This action returns a #${id} star`;
	}

	update(id: number, updateStarDto: UpdateStarDto) {
		return `This action updates a #${id} star`;
	}

	remove(id: number) {
		return `This action removes a #${id} star`;
	}
}
