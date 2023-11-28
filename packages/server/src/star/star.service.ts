import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateStarDto } from './dto/update-star.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
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

	updateStarByPostId(post_id: number, updateStarDto: UpdateStarDto) {
		return `This action updates post #${post_id}'s star`;
	}
}
