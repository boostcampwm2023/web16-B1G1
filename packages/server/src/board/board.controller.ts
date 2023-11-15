import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
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
	findAll() {
		return this.boardService.findAll();
	}

	@Get(':id')
	getBoardById(@Param('id') id: string): Promise<Board> {
		return this.boardService.getBoardById(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
		return this.boardService.update(+id, updateBoardDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.boardService.remove(+id);
	}
}
