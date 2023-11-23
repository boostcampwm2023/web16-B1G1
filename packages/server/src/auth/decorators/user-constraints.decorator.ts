import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { UserEnum } from '../enums/user.enum';

@ValidatorConstraint({ name: 'isUsername', async: false })
export class IsUsernameConstraint implements ValidatorConstraintInterface {
	validate(username: string): boolean {
		const isEngAndNum = /^[a-zA-Z0-9]+$/.test(username);
		const checkLength =
			username.length >= UserEnum.MIN_USERNAME_LENGTH &&
			username.length <= UserEnum.MAX_USERNAME_LENGTH;
		return isEngAndNum && checkLength;
	}

	defaultMessage(): string {
		return UserEnum.VIOLATE_USERNAME_MESSAGE;
	}
}

export function IsUsername(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsUsernameConstraint,
		});
	};
}

@ValidatorConstraint({ name: 'isPassword', async: false })
export class IsPasswordConstraint implements ValidatorConstraintInterface {
	validate(password: string): boolean {
		return (
			password.length >= UserEnum.MIN_PASSWORD_LENGTH &&
			password.length <= UserEnum.MAX_PASSWORD_LENGTH
		);
	}

	defaultMessage(): string {
		return UserEnum.VIOLATE_PASSWORD_MESSAGE;
	}
}

export function IsPassword(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsPasswordConstraint,
		});
	};
}

@ValidatorConstraint({ name: 'isNickname', async: false })
export class IsNicknameConstraint implements ValidatorConstraintInterface {
	validate(nickname: string): boolean {
		const isEngAndNumAndKor = /^[a-zA-Z0-9가-힣]+$/.test(nickname);
		const checkLength =
			nickname.length >= UserEnum.MIN_NICKNAME_LENGTH &&
			nickname.length <= UserEnum.MAX_NICKNAME_LENGTH;
		return isEngAndNumAndKor && checkLength;
	}

	defaultMessage(): string {
		return UserEnum.VIOLATE_NICKNAME_MESSAGE;
	}
}

export function IsNickname(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsNicknameConstraint,
		});
	};
}
