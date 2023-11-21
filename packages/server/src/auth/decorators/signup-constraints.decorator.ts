import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';
import { SignUpEnum } from '../enums/signup.enum';

@ValidatorConstraint({ name: 'isUsername', async: false })
export class IsUsernameConstraint implements ValidatorConstraintInterface {
	validate(username: string): boolean {
		const isEngAndNum = /^[a-zA-Z0-9]+$/.test(username);
		const checkLength =
			username.length >= SignUpEnum.MIN_USERNAME_LENGTH &&
			username.length <= SignUpEnum.MAX_USERNAME_LENGTH;
		return isEngAndNum && checkLength;
	}

	defaultMessage(): string {
		return SignUpEnum.VIOLATE_USERNAME_MESSAGE;
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
			password.length >= SignUpEnum.MIN_PASSWORD_LENGTH &&
			password.length <= SignUpEnum.MAX_PASSWORD_LENGTH
		);
	}

	defaultMessage(): string {
		return SignUpEnum.VIOLATE_PASSWORD_MESSAGE;
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
			nickname.length >= SignUpEnum.MIN_NICKNAME_LENGTH &&
			nickname.length <= SignUpEnum.MAX_NICKNAME_LENGTH;
		return isEngAndNumAndKor && checkLength;
	}

	defaultMessage(): string {
		return SignUpEnum.VIOLATE_NICKNAME_MESSAGE;
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
