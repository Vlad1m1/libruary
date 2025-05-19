import express from 'express';
import AuthorController from '../controller/author.controller';
import { body, param } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';
import imageService from '../service/image.service';

const router = express.Router();

const imageIdValidator = body('imageId')
	.exists().withMessage('imageId is required')
	.isUUID().withMessage('imageId must be a valid UUID')
	.bail()
	.custom(async (value) => {
		const image = await imageService.getImageById(value);
		if (!image) {
			return Promise.reject('Image with this imageId does not exist');
		}
		return true;
	});

router.post(
	'/',
	[
		body('fullname').exists().withMessage('Fullname is required'),
		body('bio').exists().withMessage('Bio is required'),
		imageIdValidator,
		validatorMiddleware,
	],
	AuthorController.create,
);

router.get('/', AuthorController.getAll);

router.get(
	'/:id',
	[param('id').exists().withMessage('ID is required'), validatorMiddleware],
	AuthorController.getById,
);

router.put(
	'/:id',
	[
		param('id').exists().withMessage('ID is required'),
		body('fullname').optional(),
		body('bio').optional(),
		body('imageId').optional().isUUID().withMessage('imageId must be a valid UUID').bail().custom(async (value) => {
			if (!value) return true;
			const image = await imageService.getImageById(value);
			if (!image) {
				return Promise.reject('Image with this imageId does not exist');
			}
			return true;
		}),
		validatorMiddleware,
	],
	AuthorController.update,
);

router.delete(
	'/:id',
	[param('id').exists().withMessage('ID is required'), validatorMiddleware],
	AuthorController.delete,
);

export default router;
