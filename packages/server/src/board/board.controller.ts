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
	UsePipes,
	ValidationPipe,
	ParseIntPipe,
	UseGuards,
	UploadedFiles,
	Res,
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
	ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CookieAuthGuard } from 'src/auth/cookie-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserDataDto } from './dto/user-data.dto';
import { decryptAes } from 'src/utils/aes.util';
import * as FormData from 'form-data';

@Controller('post')
@ApiTags('게시글 API')
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Post()
	@UseGuards(CookieAuthGuard)
	@UseInterceptors(FilesInterceptor('file', 3))
	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: '게시글 작성', description: '게시글을 작성합니다.' })
	@ApiCreatedResponse({ status: 201, description: '게시글 작성 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 작성 실패',
	})
	createBoard(
		@Body() createBoardDto: CreateBoardDto,
		@GetUser() userData: UserDataDto,
		@UploadedFiles() files: Express.Multer.File[],
	): Promise<Board> {
		return this.boardService.createBoard(createBoardDto, userData, files);
	}

	@Get()
	@UseGuards(CookieAuthGuard)
	@ApiOperation({ summary: '게시글 조회', description: '게시글을 조회합니다.' })
	@ApiOkResponse({ status: 200, description: '게시글 조회 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 조회 실패',
	})
	findAllBoardsMine(@GetUser() userData: UserDataDto): Promise<Board[]> {
		const author = userData.nickname;
		return this.boardService.findAllBoardsByAuthor(author);
	}

	@Get('by-author')
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

	// TODO: 게시글에 대한 User정보 얻기
	@Get(':id')
	@ApiOperation({
		summary: '게시글 상세 조회',
		description: '게시글을 상세 조회합니다.',
	})
	@ApiOkResponse({ status: 200, description: '게시글 조회 성공' })
	@ApiNotFoundResponse({
		status: 404,
		description: '게시글이 존재하지 않음',
	})
	async findBoardById(
		@Param('id', ParseIntPipe) id: number,
		@Res() res,
	): Promise<void> {
		const found = await this.boardService.findBoardById(id);
		// AES 복호화
		if (found.content) {
			found.content = decryptAes(found.content); // AES 복호화하여 반환
		}

		// 폼 데이터 만들어 반환
		const formData = new FormData();
		formData.append('id', found.id.toString());
		formData.append('title', found.title);
		formData.append('content', found.content);
		formData.append('author', found.user.nickname);
		formData.append('created_at', found.created_at.toString());
		formData.append('updated_at', found.updated_at.toString());
		formData.append('like_cnt', found.like_cnt.toString());

		// NCP Object Storage 다운로드
		const files = [];
		for (let image of found.images) {
			const file: Buffer = await this.boardService.downloadFile(image.filename);
			console.log(file);
			formData.append('file', file, {
				filename: image.filename,
				contentType: image.mimetype,
			});
		}

		res.set({
			'Content-Type': 'multipart/form-data',
		});
		formData.pipe(res);
		// return found;
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
		@Param('id', ParseIntPipe) id: number,
		@Body() updateBoardDto: UpdateBoardDto,
		@GetUser() userData: UserDataDto,
	) {
		return this.boardService.updateBoard(id, updateBoardDto, userData);
	}

	@Patch(':id/like')
	@UseGuards(CookieAuthGuard)
	@UsePipes(ValidationPipe)
	@ApiOperation({
		summary: '게시글 좋아요',
		description: '게시글에 좋아요를 합니다.',
	})
	@ApiOkResponse({ status: 200, description: '게시글 좋아요 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 좋아요 실패',
	})
	patchLike(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() userData: UserDataDto,
	): Promise<Partial<Board>> {
		return this.boardService.patchLike(id, userData);
	}

	@Patch(':id/unlike')
	@UseGuards(CookieAuthGuard)
	@UsePipes(ValidationPipe)
	@ApiOperation({
		summary: '게시글 좋아요 취소',
		description: '게시글에 좋아요를 취소합니다.',
	})
	@ApiOkResponse({ status: 200, description: '게시글 좋아요 취소 성공' })
	@ApiBadRequestResponse({
		status: 400,
		description: '잘못된 요청으로 게시글 좋아요 취소 실패',
	})
	patchUnlike(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() userData: UserDataDto,
	): Promise<Partial<Board>> {
		return this.boardService.patchUnlike(id, userData);
	}

	@Delete(':id')
	@UseGuards(CookieAuthGuard)
	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: '게시글 삭제', description: '게시글을 삭제합니다.' })
	@ApiOkResponse({ status: 200, description: '게시글 삭제 성공' })
	@ApiNotFoundResponse({
		status: 404,
		description: '게시글이 존재하지 않음',
	})
	deleteBoard(
		@Param('id', ParseIntPipe) id: number,
		@GetUser() userData: UserDataDto,
	): Promise<void> {
		return this.boardService.deleteBoard(id, userData);
	}
}
