import express from 'express';
import FileController from '../controller/file.controller';
import { body, param } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';
import upload from '../middleware/upload';

const router = express.Router();

const SUPPORTED_MIMETYPES = [
	'application/pdf',
	'application/epub+zip',
	'application/x-fictionbook+xml', // fb2
	'application/vnd.ms-htmlhelp', // chm
	'application/x-mobipocket-ebook', // mobi
	'application/vnd.amazon.ebook', // azw
	'application/x-cbr',
	'application/x-cbz',
	'application/x-cbt',
	'application/x-cba',
	'application/x-cbc',
	'text/plain',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/rtf',
	// ...добавьте другие нужные форматы
];

router.post(
	'/upload',
	upload.single('file'),
	FileController.upload,
);

router.get(
	'/:id',
	[param('id').isUUID().withMessage('ID must be a valid UUID'), validatorMiddleware],
	FileController.getById,
);

router.get('/', FileController.getAll);

router.delete(
	'/:id',
	[param('id').isUUID().withMessage('ID must be a valid UUID'), validatorMiddleware],
	FileController.delete,
);

export default router;
