import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseInterceptors,
	UploadedFile,
	UsePipes,
	ValidationPipe,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateImageDto } from './dto/create-image.dto';
import { CookieAuthGuard } from 'src/auth/cookie-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('board')
@ApiTags('게시글 API')
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Post()
	@UseGuards(CookieAuthGuard)
	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: '게시글 작성', description: '게시글을 작성합니다.' })
	@ApiCreatedResponse({ status: 201, description: '게시글 작성 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 작성 실패',
	})
	createBoard(
		@GetUser() userData,
		@Body() createBoardDto: CreateBoardDto,
	): Promise<Board> {
		if (userData.nickname) createBoardDto.author = userData.nickname;
		return this.boardService.createBoard(createBoardDto, userData);
	}

	@Get()
	@UseGuards(CookieAuthGuard)
	@ApiOperation({ summary: '게시글 조회', description: '게시글을 조회합니다.' })
	@ApiOkResponse({ status: 200, description: '게시글 조회 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 조회 실패',
	})
	findAllBoards(): Promise<Board[]> {
		return this.boardService.findAllBoards();
	}

	@Get('by-author')
	@UseGuards(CookieAuthGuard)
	@ApiOperation({
		summary: '작성자별 게시글 조회',
		description: '작성자별 게시글을 조회합니다.',
	})
	@ApiOkResponse({ status: 200, description: '게시글 조회 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 조회 실패',
	})
	findAllBoardsByAuthor(@Query('author') author: string): Promise<Board[]> {
		return this.boardService.findAllBoardsByAuthor(author);
	}

	@Get(':id')
	@UseGuards(CookieAuthGuard)
	@ApiOperation({
		summary: '게시글 상세 조회',
		description: '게시글을 상세 조회합니다.',
	})
	@ApiOkResponse({ status: 200, description: '게시글 조회 성공' })
	@ApiNotFoundResponse({
		status: 404,
		description: '게시글이 존재하지 않음',
	})
	findBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
		return this.boardService.findBoardById(id);
	}

	@Patch(':id')
	@UseGuards(CookieAuthGuard)
	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: '게시글 수정', description: '게시글을 수정합니다.' })
	@ApiOkResponse({ status: 200, description: '게시글 수정 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 수정 실패',
	})
	updateBoard(
		@GetUser() userData,
		@Param('id', ParseIntPipe) id: number,
		@Body() updateBoardDto: UpdateBoardDto,
	) {
		if (userData.nickname) updateBoardDto.author = userData.nickname;
		return this.boardService.updateBoard(id, updateBoardDto);
	}

	@Patch(':id/like')
	@UseGuards(CookieAuthGuard)
	@ApiOperation({
		summary: '게시글 좋아요',
		description: '게시글에 좋아요를 합니다.',
	})
	@ApiOkResponse({ status: 200, description: '게시글 좋아요 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 좋아요 실패',
	})
	patchLike(@Param('id', ParseIntPipe) id: number): Promise<Partial<Board>> {
		return this.boardService.patchLike(id);
	}

	@Patch(':id/unlike')
	@UseGuards(CookieAuthGuard)
	@ApiOperation({
		summary: '게시글 좋아요 취소',
		description: '게시글에 좋아요를 취소합니다.',
	})
	@ApiOkResponse({ status: 200, description: '게시글 좋아요 취소 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 좋아요 취소 실패',
	})
	patchUnlike(@Param('id', ParseIntPipe) id: number): Promise<Partial<Board>> {
		return this.boardService.patchUnlike(id);
	}

	@Delete(':id')
	@UseGuards(CookieAuthGuard)
	@ApiOperation({ summary: '게시글 삭제', description: '게시글을 삭제합니다.' })
	@ApiOkResponse({ status: 200, description: '게시글 삭제 성공' })
	@ApiNotFoundResponse({
		status: 404,
		description: '게시글이 존재하지 않음',
	})
	deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.boardService.deleteBoard(id);
	}

	@Post(':id/image')
	@UseGuards(CookieAuthGuard)
	@UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
	@UsePipes(ValidationPipe)
	@ApiOperation({
		summary: '이미지 파일 업로드',
		description: '이미지 파일을 업로드합니다.',
	})
	@ApiParam({ name: 'id', description: '게시글 번호' })
	@ApiOkResponse({ status: 200, description: '이미지 파일 업로드 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 파일 업로드 실패',
	})
	@ApiNotFoundResponse({ status: 404, description: '게시글이 존재하지 않음' })
	uploadFile(
		@Param('id', ParseIntPipe) board_id: number,
		@UploadedFile() file: CreateImageDto,
	): Promise<Board> {
		return this.boardService.uploadFile(board_id, file);
	}
}
