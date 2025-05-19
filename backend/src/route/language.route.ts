import express from 'express';
import LanguageController from '../controller/language.controller';
import { body, param } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

const router = express.Router();

router.post(
	'/',
	[
		body('code').exists().withMessage('Code is required'),
		body('value').exists().withMessage('Value is required'),
		validatorMiddleware,
	],
	LanguageController.create,
);

router.get('/', LanguageController.getAll);

router.get(
	'/:id',
	[param('id').exists().withMessage('ID is required'), validatorMiddleware],
	LanguageController.getById,
);

router.put(
	'/:id',
	[
		param('id').exists().withMessage('ID is required'),
		body('code').optional(),
		body('value').optional(),
		validatorMiddleware,
	],
	LanguageController.update,
);

router.delete(
	'/:id',
	[param('id').exists().withMessage('ID is required'), validatorMiddleware],
	LanguageController.delete,
);

export default router;
