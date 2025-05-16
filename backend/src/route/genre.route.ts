import express from 'express';
import GenreController from '../controller/genre.controller';
import { body, param } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

const router = express.Router();

router.post(
	'/',
	[body('value').exists().withMessage('Value is required'), validatorMiddleware],
	GenreController.create,
);

router.get('/', GenreController.getAll);

router.get(
	'/:id',
	[param('id').exists().withMessage('ID is required'), validatorMiddleware],
	GenreController.getById,
);

router.put(
	'/:id',
	[
		param('id').exists().withMessage('ID is required'),
		body('value').optional(),
		validatorMiddleware,
	],
	GenreController.update,
);

router.delete(
	'/:id',
	[param('id').exists().withMessage('ID is required'), validatorMiddleware],
	GenreController.delete,
);

export default router;
