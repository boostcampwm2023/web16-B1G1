import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
	ParseIntPipe,
	UseGuards,
	UploadedFiles,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CookieAuthGuard } from '../auth/cookie-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserDataDto } from '../auth/dto/user-data.dto';
import { decryptAes } from '../utils/aes.util';
import { GetBoardByIdResDto } from './dto/get-board-by-id-res.dto';
import { awsConfig, bucketName } from '../config/aws.config';
import { CreateBoardSwaggerDecorator } from './decorators/swagger/create-board-swagger.decorator';
import { FindBoardByIdSwaggerDecorator } from './decorators/swagger/find-board-by-id-swagger.decorator';
import { UpdateBoardSwaggerDecorator } from './decorators/swagger/update-board-swagger.decorator';
import { PatchLikeSwaggerDecorator } from './decorators/swagger/patch-like-swagger.decorator';
import { PatchUnlikeSwaggerDecorator } from './decorators/swagger/patch-unlike-swagger.decorator';
import { DeleteBoardSwaggerDecorator } from './decorators/swagger/delete-board-by-id-swagger.decorator';

@Controller('post')
@ApiTags('게시글 API')
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Post()
	@UseGuards(CookieAuthGuard)
	@UseInterceptors(FilesInterceptor('file', 3))
	@UsePipes(ValidationPipe)
	@CreateBoardSwaggerDecorator()
	createBoard(
		@Body() createBoardDto: CreateBoardDto,
		@GetUser() userData: UserDataDto,
		@UploadedFiles() files: Express.Multer.File[],
	): Promise<Board> {
		return this.boardService.createBoard(createBoardDto, userData, files);
	}

	// TODO: 게시글에 대한 User정보 얻기
	@Get(':id')
	@FindBoardByIdSwaggerDecorator()
	async findBoardById(
		@Param('id', ParseIntPipe) id: number,
	): Promise<GetBoardByIdResDto> {
		const found = await this.boardService.findBoardById(id);
		// AES 복호화
		if (found.content) {
			found.content = decryptAes(found.content); // AES 복호화하여 반환
		}
		const boardData: GetBoardByIdResDto = {
			id: found.id,
			title: found.title,
			content: found.content,
			like_cnt: found.like_cnt,
			images: found.images.map(
				(image) => `${awsConfig.endpoint.href}${bucketName}/${image.filename}`,
			),
		};

		return boardData;
	}

	// TODO: 사진도 수정할 수 있도록 폼데이터 형태로 받기
	@Patch(':id')
	@UseGuards(CookieAuthGuard)
	@UsePipes(ValidationPipe)
	@UpdateBoardSwaggerDecorator()
	updateBoard(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateBoardDto: UpdateBoardDto,
		@GetUser() userData: UserDataDto,
	) {
		return this.boardService.updateBoard(id, updateBoardDto, userData);
	}

	@Patch(':id/like')
	@UseGuards(CookieAuthGuard)
	@UsePipes(ValidationPipe)
	@PatchLikeSwaggerDecorator()
	patchLike(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() userData: UserDataDto,
	): Promise<Partial<Board>> {
		return this.boardService.patchLike(id, userData);
	}

	@Patch(':id/unlike')
	@UseGuards(CookieAuthGuard)
	@UsePipes(ValidationPipe)
	@PatchUnlikeSwaggerDecorator()
	patchUnlike(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() userData: UserDataDto,
	): Promise<Partial<Board>> {
		return this.boardService.patchUnlike(id, userData);
	}

	// TODO: 연관된 Image 및 Star도 함께 삭제
	@Delete(':id')
	@UseGuards(CookieAuthGuard)
	@UsePipes(ValidationPipe)
	@DeleteBoardSwaggerDecorator()
	deleteBoard(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() userData: UserDataDto,
	): Promise<void> {
		return this.boardService.deleteBoard(id, userData);
	}
}
