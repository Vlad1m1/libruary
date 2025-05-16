import File from '../model/databaseModels/File';
import ApiError from '../exceptions/ApiError';
import { extname } from 'path';

class FileService {
	isFileMimetype(mimetype: string): boolean {
		// Можно добавить более строгую проверку, если нужны только определённые типы файлов
		return typeof mimetype === 'string' && mimetype.length > 0;
	}

	async createFileFromUpload(file: Express.Multer.File) {
		if (!this.isFileMimetype(file.mimetype)) {
			throw ApiError.Custom('VALIDATION_ERROR');
		}
		const dbFile = await File.create({
			path: `/uploads/${file.filename}`,
			fileSize: file.size.toString(),
			mimeType: file.mimetype,
		});
		return { id: dbFile.id, path: dbFile.path, fileSize: dbFile.fileSize, mimeType: dbFile.mimeType };
	}

	async createFile(data: { path: string; fileSize: string; mimeType: string }) {
		return await File.create(data);
	}

	async getFiles() {
		return await File.findAll();
	}

	async getFileById(id: string) {
		const file = await File.findByPk(id);
		if (!file) throw ApiError.Custom('FILE_NOT_FOUND');
		return file;
	}

	async deleteFile(id: string) {
		const file = await File.findByPk(id);
		if (!file) throw ApiError.Custom('FILE_NOT_FOUND');
		await file.destroy();
		return { success: true };
	}
}

export default new FileService();
