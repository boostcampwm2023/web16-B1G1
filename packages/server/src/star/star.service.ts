import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { UpdateStarDto } from './dto/update-star.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Star } from './schemas/star.schema';
import { Model } from 'mongoose';
import { GetStarResDto } from './dto/get-star-res.dto';
import { UserDataDto } from 'src/auth/dto/user-data.dto';

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
			if (!board.star) {
				throw new NotFoundException('no star id');
			}

			const star = await this.starModel.findOne({ _id: board.star });
			if (!star) {
				throw new NotFoundException('star not found');
			}

			// __v 필드 제거
			star.__v = undefined;

			starDataList.push({
				id: board.id,
				star,
				title: board.title,
			});
		}

		return starDataList;
	}

	async updateStarByPostId(
		post_id: number,
		updateStarDto: UpdateStarDto,
		userData: UserDataDto,
	): Promise<Star> {
		const board: Board = await this.boardRepository.findOneBy({ id: post_id });
		if (!board) {
			throw new NotFoundException('post not found');
		}

		// 게시글 작성자와 수정 요청자가 다른 경우
		if (board.user.id !== userData.userId) {
			throw new BadRequestException('not your star');
		}

		// 별 id를 조회하여 없으면 에러 리턴
		const star_id = board.star;
		if (!star_id) {
			throw new BadRequestException('star not found');
		}

		// 별 스타일이 존재하면 MongoDB에 저장
		const result = await this.starModel.updateOne(
			{ _id: star_id },
			{ ...updateStarDto },
		);
		if (!result) {
			throw new InternalServerErrorException('update star failed');
		} else if (result.matchedCount === 0) {
			throw new NotFoundException('star not found');
		} else if (result.modifiedCount === 0) {
			throw new BadRequestException('nothing to update');
		}

		const updatedStar = await this.starModel.findOne({
			_id: star_id,
		});

		return updatedStar;
	}
}
