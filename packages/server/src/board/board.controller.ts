import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';

@Controller('board')
@ApiTags('게시글 API')
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Post()
	@ApiOperation({ summary: '게시글 작성', description: '게시글을 작성합니다.' })
	@ApiCreatedResponse({ status: 201, description: '게시글 작성 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 작성 실패',
	})
	create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardService.create(createBoardDto);
	}

	@Get()
	@ApiOperation({ summary: '게시글 조회', description: '게시글을 조회합니다.' })
	@ApiCreatedResponse({ status: 200, description: '게시글 조회 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 조회 실패',
	})
	findAllBoards(): Promise<Board[]> {
		return this.boardService.findAllBoards();
	}

	@Get('by-author')
	@ApiOperation({
		summary: '작성자별 게시글 조회',
		description: '작성자별 게시글을 조회합니다.',
	})
	@ApiCreatedResponse({ status: 200, description: '게시글 조회 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 조회 실패',
	})
	findAllBoardsByAuthor(@Query('author') author: string): Promise<Board[]> {
		return this.boardService.findAllBoardsByAuthor(author);
	}

	@Get(':id')
	@ApiOperation({
		summary: '게시글 상세 조회',
		description: '게시글을 상세 조회합니다.',
	})
	@ApiCreatedResponse({ status: 200, description: '게시글 조회 성공' })
	@ApiNotFoundResponse({
		status: 404,
		description: '게시글이 존재하지 않음',
	})
	findBoardById(@Param('id') id: string): Promise<Board> {
		return this.boardService.findBoardById(+id);
	}

	@Patch(':id')
	@ApiOperation({ summary: '게시글 수정', description: '게시글을 수정합니다.' })
	@ApiCreatedResponse({ status: 200, description: '게시글 수정 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 수정 실패',
	})
	updateBoard(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
		return this.boardService.updateBoard(+id, updateBoardDto);
	}

	@Patch(':id/like')
	@ApiOperation({
		summary: '게시글 좋아요',
		description: '게시글에 좋아요를 합니다.',
	})
	@ApiCreatedResponse({ status: 200, description: '게시글 좋아요 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 좋아요 실패',
	})
	patchLike(@Param('id') id: string): Promise<Partial<Board>> {
		return this.boardService.patchLike(+id);
	}

	@Patch(':id/unlike')
	@ApiOperation({
		summary: '게시글 좋아요 취소',
		description: '게시글에 좋아요를 취소합니다.',
	})
	@ApiCreatedResponse({ status: 200, description: '게시글 좋아요 취소 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 좋아요 취소 실패',
	})
	patchUnlike(@Param('id') id: string): Promise<Partial<Board>> {
		return this.boardService.patchUnlike(+id);
	}

	@Delete(':id')
	@ApiOperation({ summary: '게시글 삭제', description: '게시글을 삭제합니다.' })
	@ApiCreatedResponse({ status: 200, description: '게시글 삭제 성공' })
	@ApiNotFoundResponse({
		status: 404,
		description: '게시글이 존재하지 않음',
	})
	deleteBoard(@Param('id') id: string): Promise<void> {
		return this.boardService.deleteBoard(+id);
	}
}
