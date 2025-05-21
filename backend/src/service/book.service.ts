import Book from '../model/databaseModels/Book';
import BookToGenre from '../model/databaseModels/BookToGenre';
import BookToAuthor from '../model/databaseModels/BookToAuthor';
import ApiError from '../exceptions/ApiError';
import Genre from '../model/databaseModels/Genre';
import Author from '../model/databaseModels/Author';
import File from '../model/databaseModels/File';
import Language from '../model/databaseModels/Language';
import Image from '../model/databaseModels/Image';
import { Transaction, Op } from 'sequelize';
import sequelize from '../model/db';
import { BookInstance } from '../model/databaseModels/Book';
import { GenreInstance } from '../model/databaseModels/Genre';
import { AuthorInstance } from '../model/databaseModels/Author';
import { BookToGenreInstance } from '../model/databaseModels/BookToGenre';
import { BookToAuthorInstance } from '../model/databaseModels/BookToAuthor';

interface BookDTO {
  id: string;
  title: string;
  annotation: string;
  year: number;
  fileId?: string;
  languageId?: string;
  imageId?: string;
  genres: { id: string; value: string }[];
  authors: { id: string; fullname: string; bio: string; imageId?: string }[];
}

// ВАЖНО: genreId и authorId не определены в BookToGenreInstance/BookToAuthorInstance как поля, но они есть в базе и доступны через .get('genreId')
function toBookDTO(book: BookInstance, genres: GenreInstance[], authors: AuthorInstance[]): BookDTO {
	return {
		id: book.id,
		title: book.title,
		annotation: book.annotation,
		year: book.year,
		fileId: book.fileId,
		languageId: book.languageId,
		imageId: book.imageId,
		genres: genres.map((g) => ({ id: g.id, value: g.value })),
		authors: authors.map((a) => ({ id: a.id, fullname: a.fullname, bio: a.bio, imageId: a.imageId })),
	};
}

class BookService {
	async createBook(data: {
    title: string;
    annotation: string;
    year: number;
    fileId: string;
    languageId: string;
    imageId: string;
    genreIds: string[];
    authorIds: string[];
  }) {
		return await sequelize.transaction(async (t: Transaction) => {
			// Проверки на существование связанных сущностей
			const file = await File.findByPk(data.fileId, { transaction: t });
			if (!file) throw ApiError.Custom('FILE_NOT_FOUND');
			const language = await Language.findByPk(data.languageId, { transaction: t });
			if (!language) throw ApiError.Custom('LANGUAGE_NOT_FOUND');
			const image = await Image.findByPk(data.imageId, { transaction: t });
			if (!image) throw ApiError.Custom('IMAGE_NOT_FOUND');

			// Создание книги
			const book = await Book.create({
				title: data.title,
				annotation: data.annotation,
				year: data.year,
				fileId: data.fileId,
				languageId: data.languageId,
				imageId: data.imageId,
			}, { transaction: t });

			// Добавление жанров в BookToGenre
			if (data.genreIds && data.genreIds.length > 0) {
				for (const genreId of data.genreIds) {
					const genre = await Genre.findByPk(genreId, { transaction: t });
					if (!genre) throw ApiError.Custom('GENRE_NOT_FOUND');
					await BookToGenre.create({ bookId: book.id, genreId }, { transaction: t });
				}
			}
			// Добавление авторов в BookToAuthor
			if (data.authorIds && data.authorIds.length > 0) {
				for (const authorId of data.authorIds) {
					const author = await Author.findByPk(authorId, { transaction: t });
					if (!author) throw ApiError.Custom('AUTHOR_NOT_FOUND');
					await BookToAuthor.create({ bookId: book.id, authorId }, { transaction: t });
				}
			}
			return book;
		});
	}

	async getBooks() {
		const books = await Book.findAll();
		const result: BookDTO[] = [];
		for (const book of books) {
			// Получаем жанры через BookToGenre
			const bookToGenres = await BookToGenre.findAll({ where: { bookId: book.id } });
			const genreIds = bookToGenres.map((bg) => (bg as any).getDataValue('genreId')).filter(Boolean);
			const genres = genreIds.length > 0 ? await Genre.findAll({ where: { id: genreIds } }) : [];
			// Получаем авторов через BookToAuthor
			const bookToAuthors = await BookToAuthor.findAll({ where: { bookId: book.id } });
			const authorIds = bookToAuthors.map((ba) => (ba as any).getDataValue('authorId')).filter(Boolean);
			const authors = authorIds.length > 0 ? await Author.findAll({ where: { id: authorIds } }) : [];
			result.push(toBookDTO(book, genres, authors));
		}
		return result;
	}

	async getBookById(id: string) {
		const book = await Book.findByPk(id);
		if (!book) throw ApiError.Custom('BOOK_NOT_FOUND');
		const bookToGenres = await BookToGenre.findAll({ where: { bookId: book.id } });
		const genreIds = bookToGenres.map((bg) => (bg as any).getDataValue('genreId')).filter(Boolean);
		const genres = genreIds.length > 0 ? await Genre.findAll({ where: { id: genreIds } }) : [];
		const bookToAuthors = await BookToAuthor.findAll({ where: { bookId: book.id } });
		const authorIds = bookToAuthors.map((ba) => (ba as any).getDataValue('authorId')).filter(Boolean);
		const authors = authorIds.length > 0 ? await Author.findAll({ where: { id: authorIds } }) : [];
		return toBookDTO(book, genres, authors);
	}

	async updateBook(id: string, data: Partial<{
    title: string;
    annotation: string;
    year: number;
    fileId: string;
    languageId: string;
    imageId: string;
    genreIds: string[];
    authorIds: string[];
  }>) {
		return await sequelize.transaction(async (t: Transaction) => {
			const book = await Book.findByPk(id, { transaction: t });
			if (!book) throw ApiError.Custom('BOOK_NOT_FOUND');
			await book.update(data, { transaction: t });
			// Обновление жанров
			if (data.genreIds) {
				await BookToGenre.destroy({ where: { bookId: id }, transaction: t });
				for (const genreId of data.genreIds) {
					const genre = await Genre.findByPk(genreId, { transaction: t });
					if (!genre) throw ApiError.Custom('GENRE_NOT_FOUND');
					await BookToGenre.create({ bookId: id, genreId }, { transaction: t });
				}
			}
			// Обновление авторов
			if (data.authorIds) {
				await BookToAuthor.destroy({ where: { bookId: id }, transaction: t });
				for (const authorId of data.authorIds) {
					const author = await Author.findByPk(authorId, { transaction: t });
					if (!author) throw ApiError.Custom('AUTHOR_NOT_FOUND');
					await BookToAuthor.create({ bookId: id, authorId }, { transaction: t });
				}
			}
			return book;
		});
	}

	async deleteBook(id: string) {
		return await sequelize.transaction(async (t: Transaction) => {
			await BookToGenre.destroy({ where: { bookId: id }, transaction: t });
			await BookToAuthor.destroy({ where: { bookId: id }, transaction: t });
			const book = await Book.findByPk(id, { transaction: t });
			if (!book) throw ApiError.Custom('BOOK_NOT_FOUND');
			await book.destroy({ transaction: t });
			return { success: true };
		});
	}

	async searchBooks(filters: {
  query?: string;
  authorIds?: string[];
  langIds?: string[];
  genreIds?: string[];
  years?: number[];
}): Promise<BookDTO[]> {
		const { query, authorIds, langIds, genreIds, years } = filters;
		const where: Record<string, unknown> = {};
		if (query) {
			where.title = { [Op.iLike]: `%${query}%` };
		}
		if (langIds && langIds.length > 0) {
			where.languageId = { [Op.in]: langIds };
		}
		if (years && years.length > 0) {
			if (years.length === 1) {
				where.year = years[0];
			} else if (years.length === 2) {
				where.year = { [Op.between]: [Math.min(years[0], years[1]), Math.max(years[0], years[1])] };
			}
		}
		let books = await Book.findAll({ where }) as BookInstance[];
		// Фильтрация по жанрам
		if (genreIds && genreIds.length > 0) {
			const bookToGenres = await BookToGenre.findAll() as BookToGenreInstance[];
			const bookIdsByGenre = bookToGenres
				.map((bg) => {
					const genreId = bg.get('genreId') as string | undefined;
					const bookId = bg.get('bookId') as string | undefined;
					return genreId && genreIds.includes(genreId) && bookId ? bookId : undefined;
				})
				.filter((id): id is string => Boolean(id));
			books = books.filter((b) => bookIdsByGenre.includes(b.id));
		}
		// Фильтрация по авторам
		if (authorIds && authorIds.length > 0) {
			const bookToAuthors = await BookToAuthor.findAll() as BookToAuthorInstance[];
			const bookIdsByAuthor = bookToAuthors
				.map((ba) => {
					const authorId = ba.get('authorId') as string | undefined;
					const bookId = ba.get('bookId') as string | undefined;
					return authorId && authorIds.includes(authorId) && bookId ? bookId : undefined;
				})
				.filter((id): id is string => Boolean(id));
			books = books.filter((b) => bookIdsByAuthor.includes(b.id));
		}
		// Собираем DTO
		const result: BookDTO[] = [];
		for (const book of books) {
			const bookToGenres = await BookToGenre.findAll({ where: { bookId: book.id } }) as BookToGenreInstance[];
			const genreIdsForBook = bookToGenres.map((bg) => bg.get('genreId') as string | undefined).filter((id): id is string => Boolean(id));
			const genres = genreIdsForBook.length > 0
				? await Genre.findAll({ where: { id: genreIdsForBook } }) as GenreInstance[]
				: [];
			const bookToAuthors = await BookToAuthor.findAll({ where: { bookId: book.id } }) as BookToAuthorInstance[];
			const authorIdsForBook = bookToAuthors.map((ba) => ba.get('authorId') as string | undefined).filter((id): id is string => Boolean(id));
			const authors = authorIdsForBook.length > 0
				? await Author.findAll({ where: { id: authorIdsForBook } }) as AuthorInstance[]
				: [];
			result.push(toBookDTO(book, genres, authors));
		}
		return result;
	}
}

export default new BookService();
