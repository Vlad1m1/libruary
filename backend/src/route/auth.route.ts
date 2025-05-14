import express from 'express';
import AuthController from '../controller/auth.controller';
import { body, param } from 'express-validator';
import checkAuth from '../middleware/CheckAuth';
import validatorMiddleware from '../middleware/validator.middleware';

const router = express.Router();

router.post('/register', [
	body('email')
		.exists().withMessage('Email обязателен')
		.isEmail().withMessage('Неверный формат email'),
	body('password')
		.exists().withMessage('Пароль обязателен')
		.isLength({ min: 6, max: 32 }).withMessage('Пароль должен быть от 6 до 32 символов'),
	body('firstname')
		.exists().withMessage('Имя обязательно')
		.notEmpty().withMessage('Имя не может быть пустым'),
	body('lastname')
		.exists().withMessage('Фамилия обязательна')
		.notEmpty().withMessage('Фамилия не может быть пустой'),
	body('patronymic')
		.exists().withMessage('Отчество обязательно')
		.notEmpty().withMessage('Отчество не может быть пустым'),
	validatorMiddleware,
], AuthController.register);

router.post('/login', [
	body('email')
		.exists().withMessage('Email обязателен')
		.isEmail().withMessage('Неверный формат email'),
	body('password')
		.exists().withMessage('Пароль обязателен')
		.isLength({ min: 6, max: 32 }).withMessage('Пароль должен быть от 6 до 32 символов'),
	validatorMiddleware,
], AuthController.login);

router.post('/logout', checkAuth, AuthController.logout);

router.get('/refresh', AuthController.refresh);

router.get('/verify-email/:hash', [
	param('hash')
		.exists().withMessage('Хеш подтверждения обязателен')
		.notEmpty().withMessage('Хеш подтверждения не может быть пустым'),
	validatorMiddleware,
], AuthController.verifyEmail);

router.post('/forgot-password', [
	body('email')
		.exists().withMessage('Email обязателен')
		.isEmail().withMessage('Неверный формат email'),
	validatorMiddleware,
], AuthController.forgotPassword);

router.get('/reset-password/:hash', [
	param('hash')
		.exists().withMessage('Хеш сброса пароля обязателен')
		.notEmpty().withMessage('Хеш сброса пароля не может быть пустым'),
	body('newPassword')
		.exists().withMessage('Новый пароль обязателен')
		.isLength({ min: 6, max: 32 }).withMessage('Пароль должен быть от 6 до 32 символов'),
	validatorMiddleware,
], AuthController.resetPassword);

export default router;
