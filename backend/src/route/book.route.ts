import express from 'express';
import BookController from '../controller/book.controller';
import { body, param } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

const router = express.Router();

router.post(
	'/',
	[
		body('title').exists().withMessage('Title is required'),
		body('annotation').exists().withMessage('Annotation is required'),
		body('year').isInt().withMessage('Year must be an integer'),
		body('fileId').isUUID().withMessage('fileId must be a valid UUID'),
		body('languageId').isUUID().withMessage('languageId must be a valid UUID'),
		body('imageId').isUUID().withMessage('imageId must be a valid UUID'),
		body('genreIds').isArray().withMessage('genreIds must be an array of UUIDs'),
		body('authorIds').isArray().withMessage('authorIds must be an array of UUIDs'),
		validatorMiddleware,
	],
	BookController.create,
);

router.get('/search', BookController.search);

router.get(
	'/:id',
	[param('id').isUUID().withMessage('ID must be a valid UUID'), validatorMiddleware],
	BookController.getById,
);

router.put(
	'/:id',
	[
		param('id').isUUID().withMessage('ID must be a valid UUID'),
		body('title').optional(),
		body('annotation').optional(),
		body('year').optional().isInt().withMessage('Year must be an integer'),
		body('fileId').optional().isUUID().withMessage('fileId must be a valid UUID'),
		body('languageId').optional().isUUID().withMessage('languageId must be a valid UUID'),
		body('imageId').optional().isUUID().withMessage('imageId must be a valid UUID'),
		body('genreIds').optional().isArray().withMessage('genreIds must be an array of UUIDs'),
		body('authorIds').optional().isArray().withMessage('authorIds must be an array of UUIDs'),
		validatorMiddleware,
	],
	BookController.update,
);

router.delete(
	'/:id',
	[param('id').isUUID().withMessage('ID must be a valid UUID'), validatorMiddleware],
	BookController.delete,
);

export default router;
