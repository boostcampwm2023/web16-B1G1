import { PartialType } from '@nestjs/swagger';
import { CreateStarDto } from './create-star.dto';

export class UpdateStarDto extends PartialType(CreateStarDto) {}
