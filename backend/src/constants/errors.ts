export const errors = {
	EMAIL_NOT_VERIFIED: {
		name: 'EMAIL_NOT_VERIFIED',
		description: 'Email не подтвержден. Пожалуйста, подтвердите email для входа в аккаунт',
		code: 403,
	},
	VALIDATION_ERROR: {
		name: 'VALIDATION_ERROR',
		description: 'Ошибка валидации данных',
		code: 400,
	},
	NOT_AUTH: {
		name: 'NOT_AUTH',
		description: 'Пользователь не авторизован',
		code: 401,
	},
	EMAIL_INVALID: {
		name: 'EMAIL_EMPTY',
		description: 'Неверная почта.',
		code: 400,
	},
	INVALID_ACCESS_TOKEN: {
		name: 'INVALID_ACCESS_TOKEN',
		description: 'Неверный access токен',
		code: 400,
	},
	INVALID_REFRESH_TOKEN: {
		name: 'INVALID_REFRESH_TOKEN',
		description: 'Неверный refresh токен',
		code: 400,
	},
	USER_NOT_FOUND: {
		name: 'USER_NOT_FOUND',
		description: 'Пользователь не найден',
		code: 404,
	},
	USER_ALREADY_EXIST: {
		name: 'USER_ALREADY_EXIST',
		description: 'Пользователь уже существует',
		code: 400,
	},
	QUOTA_LIMIT: {
		name: 'QUOTA_LIMIT',
		description: 'Повторите запрос позже',
		code: 400,
	},
	INVALID_VERIFICATION_CODE: {
		name: 'INVALID_VERIFICATION_CODE',
		description: 'Неверный код подтверждения',
		code: 400,
	},
	VERIFICATION_CODE_EXPIRED: {
		name: 'VERIFICATION_CODE_EXPIRED',
		description: 'Срок действия кода подтверждения истек',
		code: 400,
	},
	INVALID_RESET_CODE: {
		name: 'INVALID_RESET_CODE',
		description: 'Неверный код сброса пароля',
		code: 400,
	},
	RESET_CODE_EXPIRED: {
		name: 'RESET_CODE_EXPIRED',
		description: 'Срок действия кода сброса пароля истек',
		code: 400,
	},
	LANGUAGE_NOT_FOUND: {
		name: 'LANGUAGE_NOT_FOUND',
		description: 'Язык не найден',
		code: 404,
	},
	GENRE_NOT_FOUND: {
		name: 'GENRE_NOT_FOUND',
		description: 'Жанр не найден',
		code: 404,
	},
	IMAGE_NOT_FOUND: {
		name: 'IMAGE_NOT_FOUND',
		description: 'Изображение не найдено',
		code: 404,
	},
	AUTHOR_NOT_FOUND: {
		name: 'AUTHOR_NOT_FOUND',
		description: 'Автор не найден',
		code: 404,
	},
	FILE_NOT_FOUND: {
		name: 'FILE_NOT_FOUND',
		description: 'Файл не найден',
		code: 404,
	},
	BOOK_NOT_FOUND: {
		name: 'BOOK_NOT_FOUND',
		description: 'Книга не найдена',
		code: 404,
	},
};

export type ERROR_KEYS = keyof typeof errors;
export type ERRORS = typeof errors[ERROR_KEYS];
