import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserShareStatus } from '../enums/user.enum';

export class StatusValidationPipe implements PipeTransform {
	readonly statusOptions = [UserShareStatus.PRIVATE, UserShareStatus.PUBLIC];

	transform(value: any) {
		value = value.toLowerCase();
		if (!this.statusOptions.includes(value)) {
			throw new BadRequestException(`${value}는 올바르지 않은 status값입니다.`);
		}
		return value;
	}
}
