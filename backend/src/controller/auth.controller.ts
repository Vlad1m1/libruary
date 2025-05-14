import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import config from 'config';
import userService from '../service/user.service';
import tokenService from '../service/token.service';
import mailService from '../service/mail.service';
import templateService from '../service/template.service';
import { AuthDTO } from '../dto/Auth.dto';
import ApiError from '../exceptions/ApiError';
import { ADDRESS } from '../index';

class AuthController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password, firstname, lastname, patronymic } = req.body;

			const user = await userService.Create(email, firstname, lastname, patronymic, password);
			const hash = await userService.generateConfirmHash(user.id);

			const verificationLink = `${ADDRESS}/verify-email/${hash}`;
			const htmlTemplate = await templateService.getVerificationEmail(verificationLink);

			await mailService.SendMail({
				recipient: email,
				title: 'Подтверждение email адреса',
				HTML: htmlTemplate,
			});

			res.json({
				success: true,
				message: 'На вашу почту отправлено письмо для подтверждения регистрации',
			});
		} catch (err) {
			next(err);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;

			const user = await userService.Get({ email });
			if (!user) {
				throw ApiError.Custom('USER_NOT_FOUND');
			}

			const isPassEquals = await bcrypt.compare(password, user.password);
			if (!isPassEquals) {
				throw ApiError.Custom('USER_NOT_FOUND');
			}

			if (!user.isVerified) {
				throw ApiError.Custom('EMAIL_NOT_VERIFIED');
			}

			const tokens = tokenService.GenerateTokens({ userId: user.id });
			await tokenService.SaveToken(user.id, tokens.refresh_token);

			res.json(new AuthDTO(tokens, user));
		} catch (err) {
			next(err);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			await tokenService.RemoveToken(refreshToken);
			res.clearCookie('refreshToken');
			res.json({ success: true });
		} catch (err) {
			next(err);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;

			const userData = tokenService.ValidateRefreshToken(refreshToken);
			const tokenFromDb = await tokenService.FindToken(refreshToken);

			if (!userData || !tokenFromDb) {
				throw ApiError.Custom('INVALID_REFRESH_TOKEN');
			}

			const user = await userService.Get({ id: userData.userId });
			if (!user) {
				throw ApiError.Custom('USER_NOT_FOUND');
			}

			const tokens = tokenService.GenerateTokens({ userId: user.id });
			await tokenService.SaveToken(user.id, tokens.refresh_token);

			res.json(new AuthDTO(tokens, user));
		} catch (err) {
			next(err);
		}
	}

	async verifyEmail(req: Request, res: Response, next: NextFunction) {
		try {
			const { hash } = req.params;
			const user = await userService.verifyEmailCode(hash);

			const tokens = tokenService.GenerateTokens({ userId: user.id });
			await tokenService.SaveToken(user.id, tokens.refresh_token);

			res.json(new AuthDTO(tokens, user));
		} catch (err) {
			next(err);
		}
	}

	async forgotPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;

			const hash = await userService.generateResetPasswordHash(email);
			const resetLink = `${ADDRESS}/reset-password/${hash}`;
			const htmlTemplate = await templateService.getResetPasswordEmail(resetLink);

			await mailService.SendMail({
				recipient: email,
				title: 'Восстановление пароля',
				HTML: htmlTemplate,
			});

			res.json({ success: true });
		} catch (err) {
			next(err);
		}
	}

	async resetPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { hash } = req.params;
			const { newPassword } = req.body;

			await userService.verifyResetPasswordHash(hash, newPassword);

			res.json({ success: true });
		} catch (err) {
			next(err);
		}
	}
}

export default new AuthController();
