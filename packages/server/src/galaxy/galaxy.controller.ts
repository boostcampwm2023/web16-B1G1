import {
	Controller,
	Get,
	Body,
	Patch,
	UseInterceptors,
	UseGuards,
	Query,
	UseFilters,
} from '@nestjs/common';
import { GalaxyService } from './galaxy.service';
import { UpdateGalaxyDto } from './dto/update-galaxy.dto';
import { ApiTags } from '@nestjs/swagger';
import { LogInterceptor } from '../interceptor/log.interceptor';
import { CookieAuthGuard } from '../auth/cookie-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserDataDto } from '../auth/dto/user-data.dto';
import { FindGalaxyMineSwaggerDecorator } from './decorators/swagger/find-galaxy-mine-swagger.decorator';
import { FindGalaxyByNicknameSwaggerDecorator } from './decorators/swagger/find-galaxy-by-nickname-swagger.decorator';
import { UpdateGalaxyMineSwaggerDecorator } from './decorators/swagger/update-galaxy-mine-swagger.decorator';
import { HttpExceptionFilter } from '../exception-filter/http.exception-filter';

@Controller('galaxy')
@UseInterceptors(LogInterceptor)
@UseFilters(HttpExceptionFilter)
@ApiTags('은하 API')
export class GalaxyController {
	constructor(private readonly galaxyService: GalaxyService) {}

	// 로그인한 사용자의 은하 정보를 가져옴
	@Get()
	@UseGuards(CookieAuthGuard)
	@FindGalaxyMineSwaggerDecorator()
	findGalaxyMine(@GetUser() userData: UserDataDto) {
		const nickname = userData.nickname;
		return this.galaxyService.findGalaxyByNickname(nickname);
	}

	// 닉네임을 이용해 은하 정보를 가져옴
	@Get('by-nickname')
	@FindGalaxyByNicknameSwaggerDecorator()
	findGalaxyByNickname(@Query('nickname') nickname: string) {
		return this.galaxyService.findGalaxyByNickname(nickname);
	}

	// 로그인한 사용자의 은하 정보를 수정함
	@Patch()
	@UseGuards(CookieAuthGuard)
	@UpdateGalaxyMineSwaggerDecorator()
	updateGalaxyMine(
		@Body() updateGalaxyDto: UpdateGalaxyDto,
		@GetUser() userData: UserDataDto,
	) {
		return this.galaxyService.updateGalaxyMine(updateGalaxyDto, userData);
	}
}
