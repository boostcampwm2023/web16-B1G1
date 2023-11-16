import { PartialType } from '@nestjs/mapped-types';
import { SignUpUserDto } from './signup-user.dto';

export class UpdateUserDto extends PartialType(SignUpUserDto) {}
