import Image from '../model/databaseModels/Image';
import ApiError from '../exceptions/ApiError';
import { extname } from 'path';

class ImageService {
	isImageMimetype(mimetype: string): boolean {
		return mimetype.startsWith('image/');
	}

	async createImageFromFile(file: Express.Multer.File) {
		if (!this.isImageMimetype(file.mimetype)) {
			throw ApiError.Custom('VALIDATION_ERROR');
		}
		const image = await Image.create({ path: `/uploads/${file.filename}` });
		return { id: image.id, path: image.path };
	}

	async createImage(data: { path: string }) {
		return await Image.create(data);
	}

	async getImages() {
		return await Image.findAll();
	}

	async getImageById(id: string) {
		const image = await Image.findByPk(id);
		if (!image) throw ApiError.Custom('IMAGE_NOT_FOUND');
		return image;
	}

	async deleteImage(id: string) {
		const image = await Image.findByPk(id);
		if (!image) throw ApiError.Custom('IMAGE_NOT_FOUND');
		await image.destroy();
		return { success: true };
	}
}

export default new ImageService();
