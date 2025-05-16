import express from 'express';
import ImageController from '../controller/image.controller';
import { param } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';
import upload from '../middleware/upload';

const router = express.Router();

router.post(
	'/upload',
	upload.single('image'),
	ImageController.upload,
);

router.get(
	'/:id',
	[param('id').exists().withMessage('ID is required'), validatorMiddleware],
	ImageController.getById,
);

router.delete(
	'/:id',
	[param('id').exists().withMessage('ID is required'), validatorMiddleware],
	ImageController.delete,
);

router.get('/', ImageController.getAll);

export default router;
