import Book from '../model/databaseModels/Book';
import Author from '../model/databaseModels/Author';
import BookToGenre from '../model/databaseModels/BookToGenre';
import { Op } from 'sequelize';

class SearchService {
	async search(q: string, filters: { years?: string; genres?: string; languages?: string }) {
		let yearFilter: any = undefined;
		if (filters.years) {
			const yearsArr = filters.years.split(',').map((y) => parseInt(y, 10)).filter((y) => !isNaN(y));
			if (yearsArr.length === 1) yearFilter = yearsArr[0];
			else if (yearsArr.length > 1) yearFilter = { [Op.in]: yearsArr };
		}

		let genreBookIds: string[] | undefined = undefined;
		if (filters.genres) {
			const genreIds = filters.genres.split(',').map((g) => g.trim()).filter(Boolean);
			if (genreIds.length > 0) {
				const bookToGenres = await BookToGenre.findAll({ where: { [Op.and]: genreIds.map((id) => ({ genreId: id })) } });
				genreBookIds = bookToGenres.map((bg) => (bg as any).getDataValue('bookId')).filter(Boolean);
			}
		}

		let languageFilter: any = undefined;
		if (filters.languages) {
			const languageIds = filters.languages.split(',').map((l) => l.trim()).filter(Boolean);
			if (languageIds.length === 1) languageFilter = languageIds[0];
			else if (languageIds.length > 1) languageFilter = { [Op.in]: languageIds };
		}

		const bookWhere: any = {
			[Op.and]: [
				q ? {
					[Op.or]: [
						{ title: { [Op.iLike]: `%${q}%` } },
						{ annotation: { [Op.iLike]: `%${q}%` } },
					],
				} : undefined,
				yearFilter !== undefined ? { year: yearFilter } : {},
				languageFilter ? { languageId: languageFilter } : {},
				genreBookIds ? { id: { [Op.in]: genreBookIds } } : {},
			].filter(Boolean),
		};
		const books = await Book.findAll({ where: bookWhere, raw: true });

		const authors = q
			? await Author.findAll({
				where: {
					[Op.or]: [
						{ fullname: { [Op.iLike]: `%${q}%` } },
						{ bio: { [Op.iLike]: `%${q}%` } },
					],
				},
				raw: true,
			})
			: [];
		return { books, authors };
	}
}

export default new SearchService();
