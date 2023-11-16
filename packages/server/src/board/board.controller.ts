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

@Controller('board')
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Post()
	create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardService.create(createBoardDto);
	}

	@Get()
	findAllBoards(): Promise<Board[]> {
		return this.boardService.findAllBoards();
	}

	@Get('by-author')
	findAllBoardsByAuthor(@Query('author') author: string): Promise<Board[]> {
		return this.boardService.findAllBoardsByAuthor(author);
	}

	@Get(':id')
	findBoardById(@Param('id') id: string): Promise<Board> {
		return this.boardService.findBoardById(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
		return this.boardService.update(+id, updateBoardDto);
	}

	@Patch(':id/like')
	patchLike(@Param('id') id: string): Promise<Partial<Board>> {
		return this.boardService.patchLike(+id);
	}

	@Patch(':id/unlike')
	patchUnlike(@Param('id') id: string): Promise<Partial<Board>> {
		return this.boardService.patchUnlike(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.boardService.remove(+id);
	}
}
