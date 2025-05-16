import { Request, Response, NextFunction } from 'express';
import fileService from '../service/file.service';
import path from 'path';

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

class FileController {
	async upload(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.file) {
				return res.status(400).json({ error: 'No file uploaded' });
			}
			if (!SUPPORTED_MIMETYPES.includes(req.file.mimetype)) {
				return res.status(400).json({ error: 'Unsupported file type' });
			}
			const result = await fileService.createFileFromUpload(req.file);
			res.status(201).json(result);
		} catch (err) {
			next(err);
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const file = await fileService.createFile(req.body);
			res.status(201).json(file);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const files = await fileService.getFiles();
			res.json(files);
		} catch (err) {
			next(err);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const file = await fileService.getFileById(req.params.id);
			if (!file) return res.status(404).json({ error: 'File not found' });
			const filePath = path.resolve(__dirname, '../../', file.path.replace(/^\//, ''));
			res.sendFile(filePath);
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await fileService.deleteFile(req.params.id);
			res.json(result);
		} catch (err) {
			next(err);
		}
	}
}

export default new FileController();
