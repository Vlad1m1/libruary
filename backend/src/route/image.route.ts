import express from 'express';
import ImageController from '../controller/image.controller';
import { body, param } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';
import upload from '../middleware/upload';
import path from 'path';

const router = express.Router();

router.post(
	'/',
	[body('value').exists().withMessage('Value is required'), validatorMiddleware],
	ImageController.create,
);

router.get('/', ImageController.getAll);

router.get('/:id', async (req, res, next) => {
	try {
		const imageService = require('../service/image.service').default;
		const image = await imageService.getImageById(req.params.id);
		if (!image) return res.status(404).json({ error: 'Image not found' });
		const filePath = path.resolve(__dirname, '../../', image.path.replace(/^\//, ''));
		res.sendFile(filePath);
	} catch (err) {
		next(err);
	}
});

router.delete(
	'/:id',
	[param('id').exists().withMessage('ID is required'), validatorMiddleware],
	ImageController.delete,
);

router.post(
	'/upload',
	upload.single('image'),
	async (req, res, next) => {
		try {
			if (!req.file) {
				return res.status(400).json({ error: 'No file uploaded' });
			}
			const result = await require('../service/image.service').default.createImageFromFile(req.file);
			res.status(201).json(result);
		} catch (err) {
			next(err);
		}
	},
);

export default router;
