import { Request, Response, NextFunction } from 'express';
import genreService from '../service/genre.service';

class GenreController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const genre = await genreService.createGenre(req.body);
			res.status(201).json(genre);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const genres = await genreService.getGenres();
			res.json(genres);
		} catch (err) {
			next(err);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const genre = await genreService.getGenreById(req.params.id);
			res.json(genre);
		} catch (err) {
			next(err);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const genre = await genreService.updateGenre(req.params.id, req.body);
			res.json(genre);
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await genreService.deleteGenre(req.params.id);
			res.json(result);
		} catch (err) {
			next(err);
		}
	}
}

export default new GenreController();
