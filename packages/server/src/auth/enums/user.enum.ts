export enum UserEnum {
	MIN_USERNAME_LENGTH = 4,
	MAX_USERNAME_LENGTH = 50,
	MIN_PASSWORD_LENGTH = 8,
	MAX_PASSWORD_LENGTH = 100,
	MIN_NICKNAME_LENGTH = 2,
	MAX_NICKNAME_LENGTH = 50,

	USERNAME_NOTEMPTY_MESSAGE = 'username is required',
	PASSWORD_NOTEMPTY_MESSAGE = 'password is required',
	NICKNAME_NOTEMPTY_MESSAGE = 'nickname is required',

	USERNAME_ISSTRING_MESSAGE = 'username must be a string',
	PASSWORD_ISSTRING_MESSAGE = 'password must be a string',
	NICKNAME_ISSTRING_MESSAGE = 'nickname must be a string',

	VIOLATE_USERNAME_MESSAGE = `username is invalid`,
	VIOLATE_PASSWORD_MESSAGE = `password is invalid`,
	VIOLATE_NICKNAME_MESSAGE = `nickname is invalid`,

	NOT_EXIST_USERNAME_MESSAGE = 'username does not exist',
	UNCORRECT_PASSWORD_MESSAGE = 'password is uncorrect',

	SUCCESS_SIGNOUT_MESSAGE = 'success signout',
}

export enum UserShareStatus {
	PUBLIC = 'public',
	PRIVATE = 'private',
}
