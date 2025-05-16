import { Request, Response, NextFunction } from 'express';
import imageService from '../service/image.service';

class ImageController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const image = await imageService.createImage(req.body);
			res.status(201).json(image);
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
			res.json(image);
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
