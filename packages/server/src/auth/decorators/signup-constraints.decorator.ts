import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isUsername', async: false })
export class IsUsernameConstraint implements ValidatorConstraintInterface {
	validate(username: string): boolean {
		const isEngAndNum = /^[a-zA-Z0-9]+$/.test(username);
		const checkLength = username.length >= 4 && username.length <= 50;
		return isEngAndNum && checkLength;
	}

	defaultMessage(): string {
		return '아이디는 영문자와 숫자로 이루어진 4~50자여야 합니다.';
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
		return password.length >= 8 && password.length <= 100;
	}

	defaultMessage(): string {
		return '비밀번호는 8~100자여야 합니다.';
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
		const checkLength = nickname.length >= 2 && nickname.length <= 50;
		return isEngAndNumAndKor && checkLength;
	}

	defaultMessage(): string {
		return '닉네임은 영문자, 숫자, 한글로 이루어진 2~50자여야 합니다.';
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
