import fs from 'fs';
import path from 'path';

class TemplateService {
	private templatesDir: string;

	constructor() {
		this.templatesDir = path.join(__dirname, '../templates/email');
	}

	private async readTemplate(templateName: string): Promise<string> {
		const templatePath = path.join(this.templatesDir, templateName);
		return fs.promises.readFile(templatePath, 'utf8');
	}

	private replaceVariables(template: string, variables: Record<string, string>): string {
		return Object.entries(variables).reduce((result, [key, value]) => {
			return result.replace(new RegExp(`{{${key}}}`, 'g'), value);
		}, template);
	}

	async getVerificationEmail(verificationLink: string): Promise<string> {
		const template = await this.readTemplate('verification.html');
		return this.replaceVariables(template, { verificationLink });
	}

	async getResetPasswordEmail(resetLink: string): Promise<string> {
		const template = await this.readTemplate('reset-password.html');
		return this.replaceVariables(template, { resetLink });
	}
}

export default new TemplateService();
