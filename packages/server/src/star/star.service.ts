import { Injectable } from '@nestjs/common';
import { CreateStarDto } from './dto/create-star.dto';
import { UpdateStarDto } from './dto/update-star.dto';

@Injectable()
export class StarService {
  create(createStarDto: CreateStarDto) {
    return 'This action adds a new star';
  }

  findAll() {
    return `This action returns all star`;
  }

  findOne(id: number) {
    return `This action returns a #${id} star`;
  }

  update(id: number, updateStarDto: UpdateStarDto) {
    return `This action updates a #${id} star`;
  }

  remove(id: number) {
    return `This action removes a #${id} star`;
  }
}
