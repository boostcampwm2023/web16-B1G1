import { PartialType } from '@nestjs/swagger';
import { CreateGalaxyDto } from './create-galaxy.dto';

export class UpdateGalaxyDto extends PartialType(CreateGalaxyDto) {}
