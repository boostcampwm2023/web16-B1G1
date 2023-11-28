import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	UseGuards,
	Query,
} from '@nestjs/common';
import { StarService } from './star.service';
import { UpdateStarDto } from './dto/update-star.dto';
import { CookieAuthGuard } from '../auth/cookie-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserDataDto } from '../auth/dto/user-data.dto';
import { GetStarResDto } from './dto/get-star-res.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindAllStarsMineSwaggerDecorator } from './decorators/swagger/find-all-stars-mine-swagger.decorator';
import { FindAllStarsByAuthorSwaggerDecorator } from './decorators/swagger/find-all-stars-by-author-swagger.decorator';
import { UpdateStarByPostIdSwaggerDecorator } from './decorators/swagger/update-star-by-post-id-swagger.decorator';

@Controller('star')
@ApiTags('별 API')
export class StarController {
	constructor(private readonly starService: StarService) {}

	@Get()
	@UseGuards(CookieAuthGuard)
	@FindAllStarsMineSwaggerDecorator()
	findAllStarsMine(@GetUser() userData: UserDataDto): Promise<GetStarResDto[]> {
		const author = userData.nickname;
		return this.starService.findAllStarsByAuthor(author);
	}

	@Get('by-author')
	@FindAllStarsByAuthorSwaggerDecorator()
	findAllStarsByAuthor(
		@Query('author') author: string,
	): Promise<GetStarResDto[]> {
		return this.starService.findAllStarsByAuthor(author);
	}

	// 게시글 id를 이용해 별 정보를 수정함
	@Patch(':id')
	@UpdateStarByPostIdSwaggerDecorator()
	updateStarByPostId(
		@Param('id') post_id: string,
		@Body() updateStarDto: UpdateStarDto,
	) {
		return this.starService.updateStarByPostId(+post_id, updateStarDto);
	}
}
