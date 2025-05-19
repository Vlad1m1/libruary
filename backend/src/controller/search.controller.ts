import { Request, Response, NextFunction } from 'express';
import searchService from '../service/search.service';

class SearchController {
	async search(req: Request, res: Response, next: NextFunction) {
		try {
			const q = req.query.q as string;
			const years = req.query.years as string | undefined;
			const genres = req.query.genres as string | undefined;
			const languages = req.query.languages as string | undefined;
			if (!q && !years && !genres && !languages) {
				return res.status(400).json({ error: 'At least one search/filter parameter is required' });
			}
			const result = await searchService.search(q || '', { years, genres, languages });
			res.json(result);
		} catch (err) {
			next(err);
		}
	}
}

export default new SearchController();
