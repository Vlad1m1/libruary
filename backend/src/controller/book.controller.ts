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
}

export default new BookController();
