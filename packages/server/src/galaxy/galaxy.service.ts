import { Injectable } from '@nestjs/common';
import { CreateGalaxyDto } from './dto/create-galaxy.dto';
import { UpdateGalaxyDto } from './dto/update-galaxy.dto';

@Injectable()
export class GalaxyService {
  create(createGalaxyDto: CreateGalaxyDto) {
    return 'This action adds a new galaxy';
  }

  findAll() {
    return `This action returns all galaxy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} galaxy`;
  }

  update(id: number, updateGalaxyDto: UpdateGalaxyDto) {
    return `This action updates a #${id} galaxy`;
  }

  remove(id: number) {
    return `This action removes a #${id} galaxy`;
  }
}
