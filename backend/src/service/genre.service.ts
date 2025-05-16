import Genre from '../model/databaseModels/Genre';
import ApiError from '../exceptions/ApiError';

class GenreService {
	async createGenre(data: { value: string }) {
		return await Genre.create(data);
	}

	async getGenres() {
		return await Genre.findAll();
	}

	async getGenreById(id: string) {
		const genre = await Genre.findByPk(id);
		if (!genre) throw ApiError.Custom('GENRE_NOT_FOUND');
		return genre;
	}

	async updateGenre(id: string, data: { value?: string }) {
		const genre = await Genre.findByPk(id);
		if (!genre) throw ApiError.Custom('GENRE_NOT_FOUND');
		await genre.update(data);
		return genre;
	}

	async deleteGenre(id: string) {
		const genre = await Genre.findByPk(id);
		if (!genre) throw ApiError.Custom('GENRE_NOT_FOUND');
		await genre.destroy();
		return { success: true };
	}
}

export default new GenreService();
