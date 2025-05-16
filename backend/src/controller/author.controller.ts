import { Request, Response, NextFunction } from 'express';
import authorService from '../service/author.service';

class AuthorController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const author = await authorService.createAuthor(req.body);
			res.status(201).json(author);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const authors = await authorService.getAuthors();
			res.json(authors);
		} catch (err) {
			next(err);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const author = await authorService.getAuthorById(req.params.id);
			res.json(author);
		} catch (err) {
			next(err);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const author = await authorService.updateAuthor(req.params.id, req.body);
			res.json(author);
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await authorService.deleteAuthor(req.params.id);
			res.json(result);
		} catch (err) {
			next(err);
		}
	}
}

export default new AuthorController();
