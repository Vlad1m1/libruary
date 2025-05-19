import { Request, Response, NextFunction } from 'express';
import languageService from '../service/language.service';

class LanguageController {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const language = await languageService.createLanguage(req.body);
			res.status(201).json(language);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const languages = await languageService.getLanguages();
			res.json(languages);
		} catch (err) {
			next(err);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const language = await languageService.getLanguageById(req.params.id);
			res.json(language);
		} catch (err) {
			next(err);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const language = await languageService.updateLanguage(req.params.id, req.body);
			res.json(language);
		} catch (err) {
			next(err);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await languageService.deleteLanguage(req.params.id);
			res.json(result);
		} catch (err) {
			next(err);
		}
	}
}

export default new LanguageController();
