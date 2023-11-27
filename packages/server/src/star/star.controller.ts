import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarService } from './star.service';
import { CreateStarDto } from './dto/create-star.dto';
import { UpdateStarDto } from './dto/update-star.dto';

@Controller('star')
export class StarController {
  constructor(private readonly starService: StarService) {}

  @Post()
  create(@Body() createStarDto: CreateStarDto) {
    return this.starService.create(createStarDto);
  }

  @Get()
  findAll() {
    return this.starService.findAll();
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
