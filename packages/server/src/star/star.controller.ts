import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
} from '@nestjs/common';
import { StarService } from './star.service';
import { CreateStarDto } from './dto/create-star.dto';
import { UpdateStarDto } from './dto/update-star.dto';
import { CookieAuthGuard } from 'src/auth/cookie-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserDataDto } from 'src/auth/dto/user-data.dto';
import { GetStarResDto } from './dto/get-star-res.dto';

@Controller('star')
export class StarController {
	constructor(private readonly starService: StarService) {}

	@Post()
	create(@Body() createStarDto: CreateStarDto) {
		return this.starService.create(createStarDto);
	}

	@Get()
	@UseGuards(CookieAuthGuard)
	findAllStarsMine(@GetUser() userData: UserDataDto): Promise<GetStarResDto[]> {
		const author = userData.nickname;
		return this.starService.findAllStarsByAuthor(author);
	}

	@Get('by-author')
	findAllStarsByAuthor(
		@Query('author') author: string,
	): Promise<GetStarResDto[]> {
		return this.starService.findAllStarsByAuthor(author);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.starService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateStarDto: UpdateStarDto) {
		return this.starService.update(+id, updateStarDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.starService.remove(+id);
	}
}
