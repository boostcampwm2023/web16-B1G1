import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalaxyService } from './galaxy.service';
import { CreateGalaxyDto } from './dto/create-galaxy.dto';
import { UpdateGalaxyDto } from './dto/update-galaxy.dto';

@Controller('galaxy')
export class GalaxyController {
  constructor(private readonly galaxyService: GalaxyService) {}

  @Post()
  create(@Body() createGalaxyDto: CreateGalaxyDto) {
    return this.galaxyService.create(createGalaxyDto);
  }

  @Get()
  findAll() {
    return this.galaxyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galaxyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalaxyDto: UpdateGalaxyDto) {
    return this.galaxyService.update(+id, updateGalaxyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galaxyService.remove(+id);
  }
}
