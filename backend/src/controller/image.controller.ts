import { Request, Response, NextFunction } from 'express';
import imageService from '../service/image.service';
import path from 'path';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

class ImageController {
	async upload(req: Request & { file?: MulterFile }, res: Response, next: NextFunction) {
		try {
			if (!req.file) {
				return res.status(400).json({ error: 'No file uploaded' });
			}
			const result = await imageService.createImageFromFile(req.file);
			res.status(201).json(result);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const images = await imageService.getImages();
			res.json(images);
		} catch (err) {
			next(err);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const image = await imageService.getImageById(req.params.id);
			if (!image) return res.status(404).json({ error: 'Image not found' });
			const filePath = path.resolve(__dirname, '../../', image.path.replace(/^\//, ''));
			res.sendFile(filePath);
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await imageService.deleteImage(req.params.id);
			res.json(result);
		} catch (err) {
			next(err);
		}
	}
}

export default new ImageController();
