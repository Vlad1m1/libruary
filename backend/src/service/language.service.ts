import Language from '../model/databaseModels/Language';
import ApiError from '../exceptions/ApiError';

class LanguageService {
	async createLanguage(data: { code: string; value: string }) {
		return await Language.create(data);
	}

	async getLanguages() {
		return await Language.findAll();
	}

	async getLanguageById(id: string) {
		const language = await Language.findByPk(id);
		if (!language) throw ApiError.Custom('LANGUAGE_NOT_FOUND');
		return language;
	}

	async updateLanguage(id: string, data: { code?: string; value?: string }) {
		const language = await Language.findByPk(id);
		if (!language) throw ApiError.Custom('LANGUAGE_NOT_FOUND');
		await language.update(data);
		return language;
	}

	async deleteLanguage(id: string) {
		const language = await Language.findByPk(id);
		if (!language) throw ApiError.Custom('LANGUAGE_NOT_FOUND');
		await language.destroy();
		return { success: true };
	}
}

export default new LanguageService();
