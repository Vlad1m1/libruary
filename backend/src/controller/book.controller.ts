import { Request, Response, NextFunction } from 'express';
import bookService from '../service/book.service';

class BookController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await bookService.createBook(req.body);
			res.status(201).json(book);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const books = await bookService.getBooks();
			res.json(books);
		} catch (err) {
			next(err);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await bookService.getBookById(req.params.id);
			res.json(book);
		} catch (err) {
			next(err);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const book = await bookService.updateBook(req.params.id, req.body);
			res.json(book);
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await bookService.deleteBook(req.params.id);
			res.json(result);
		} catch (err) {
			next(err);
		}
	}

	async search(req: Request, res: Response, next: NextFunction) {
		try {
			const { query, authorIds, langIds, genreIds, years } = req.query;
			function toStringArray(val: any): string[] | undefined {
				if (!val) return undefined;
				if (Array.isArray(val)) return val.map(String);
				return [String(val)];
			}
			function toNumberArray(val: any): number[] | undefined {
				if (!val) return undefined;
				if (Array.isArray(val)) return val.map(Number);
				return [Number(val)];
			}
			const filters = {
				query: query as string,
				authorIds: toStringArray(authorIds),
				langIds: toStringArray(langIds),
				genreIds: toStringArray(genreIds),
				years: toNumberArray(years),
			};
			const books = await bookService.searchBooks(filters);
			res.json(books);
		} catch (err) {
			next(err);
		}
	}
}

export default new BookController();
