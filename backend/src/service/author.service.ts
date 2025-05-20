import Author from '../model/databaseModels/Author';
import ApiError from '../exceptions/ApiError';

class AuthorService {
	async createAuthor(data: { fullname: string; bio: string; imageId?: string }) {
		return await Author.create(data);
	}

	async getAuthors() {
		return await Author.findAll();
	}

	async searchAuthors(query: string) {
		return await Author.findAll({
			where: {
				fullname: { 
					// Поиск по ФИО, регистронезависимо
					[require('sequelize').Op.iLike]: `%${query}%`
				}
			}
		});
	}

	async getAuthorById(id: string) {
		const author = await Author.findByPk(id);
		if (!author) throw ApiError.Custom('AUTHOR_NOT_FOUND');
		return author;
	}

	async updateAuthor(id: string, data: { fullname?: string; bio?: string; imageId?: string }) {
		const author = await Author.findByPk(id);
		if (!author) throw ApiError.Custom('AUTHOR_NOT_FOUND');
		await author.update(data);
		return author;
	}

	async deleteAuthor(id: string) {
		const author = await Author.findByPk(id);
		if (!author) throw ApiError.Custom('AUTHOR_NOT_FOUND');
		await author.destroy();
		return { success: true };
	}
}

export default new AuthorService();
