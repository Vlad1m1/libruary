import bcrypt from 'bcrypt';
import { User } from '../model';
import ApiError from '../exceptions/ApiError';
import { v4 as uuidv4 } from 'uuid';
import calcDataOffset from '../utils/calcDataOffset';
import { UserAttributes } from '../model/databaseModels/User';
import emailVerification from '../model/databaseModels/EmailVerification';
import PasswordReset from '../model/databaseModels/PasswordReset';

const PASS_HASH_ROUNDS = 4;

const EMAIL_MESSAGE_LIMIT_MS = 60 * 1000; //60S
const VERIFICATION_HASH_LIFETIME = 24 * 60 * 60 * 1000; //24H
const RESET_HASH_LIFETIME = 15 * 60 * 1000; //15M

class UserService {

	async Get(options: {
		id?: string,
		email?: string
	}) {

		if(options.id) {
			return await User.findOne({
				where: { id: options.id },
				raw: false, // чтобы получить экземпляр модели для методов типа save()
			});
		}

		if(options.email) {
			options.email = options.email.toLowerCase();
			return await User.findOne({
				where: { email: options.email },
				raw: false,
			});
		}

		return null;
	}

	async Remove(id: string) {
		const user = await this.Get({ id });

		if(! user) {
			throw ApiError.Custom('USER_NOT_FOUND');
		}

		await user.destroy();
	}

	async GetAll(limit: any, page: any) {

		const [newLimit, offset] = calcDataOffset(limit, page);

		const users = await User.findAndCountAll({ limit: newLimit, offset });

		return users;
	}

	async Create(email: string, firstname: string, lastname: string, patronymic: string, password: string) {
		email = email.toLowerCase();

		const isUserExists = !!await this.Get({ email });

		if(isUserExists) {
			throw ApiError.Custom('USER_ALREADY_EXIST');
		}
		const hashPassword = await bcrypt.hash(password, PASS_HASH_ROUNDS);

		return await User.create({
			email,
			firstname,
			lastname,
			patronymic,
			password: hashPassword,
		});
	}

	async Update(
		id: string,
		options: Partial<Omit<UserAttributes, 'id'>>) {

		const user = await this.Get({ id });

		if(! user) {
			throw ApiError.Custom('USER_NOT_FOUND');
		}

		options.email = (options.email || user.email).toLowerCase();
		options.firstname = options.firstname || user.firstname;
		options.lastname = options.lastname || user.lastname;
		options.patronymic = options.patronymic || user.patronymic;
		options.isVerified = options.isVerified || user.isVerified;
		options.password = options.password ? await bcrypt.hash(options.password, PASS_HASH_ROUNDS) : user.password;

		user.email = options.email;
		user.firstname = options.firstname;
		user.lastname = options.lastname;
		user.patronymic = options.patronymic;
		user.isVerified = options.isVerified;
		user.password = options.password;

		await user.save();

		return user;
	}

	async generateConfirmHash(id: string){
		const user = await User.findOne({ where: { id } });

		if(! user) {
			throw ApiError.Custom('USER_NOT_FOUND');
		}

		const lastEmailVerification = await emailVerification.findOne({
			where: { userId: id },
			order: [['expiresAt', 'DESC']],
		});

		if(lastEmailVerification) {
			const expirationDate = new Date(lastEmailVerification.createdAt!.getTime() + EMAIL_MESSAGE_LIMIT_MS);
			const isExpired = expirationDate < new Date();

			if(!isExpired) {
				throw ApiError.Custom('QUOTA_LIMIT');
			}
		}
		const hash =  uuidv4();
		const expiresAt = new Date(Date.now() + VERIFICATION_HASH_LIFETIME);

		await emailVerification.create({ userId: id, hash, expiresAt });

		return hash;
	}

	async verifyEmailCode(hash: string) {
		const verification = await emailVerification.findOne({
			where: { hash },
			order: [['createdAt', 'DESC']],
		});

		if (!verification) {
			throw ApiError.Custom('INVALID_VERIFICATION_CODE');
		}

		if (verification.expiresAt < new Date()) {
			throw ApiError.Custom('VERIFICATION_CODE_EXPIRED');
		}

		const user = await this.Get({ id: verification.userId });
		if (!user) {
			throw ApiError.Custom('USER_NOT_FOUND');
		}

		user.isVerified = true;
		await user.save();
		await verification.destroy();

		return user;
	}

	async generateResetPasswordHash(email: string) {
		const user = await this.Get({ email });

		if (!user) {
			throw ApiError.Custom('USER_NOT_FOUND');
		}

		const lastPasswordReset = await PasswordReset.findOne({
			where: { userId: user.id },
			order: [['createdAt', 'DESC']],
		});

		if (lastPasswordReset) {
			const expirationDate = new Date(lastPasswordReset.createdAt!.getTime() + EMAIL_MESSAGE_LIMIT_MS);
			const isExpired = expirationDate < new Date();

			if (!isExpired) {
				throw ApiError.Custom('QUOTA_LIMIT');
			}
		}

		const hash = uuidv4();
		const expiresAt = new Date(Date.now() + RESET_HASH_LIFETIME);

		await PasswordReset.create({ userId: user.id, hash, expiresAt });

		return hash;
	}

	async verifyResetPasswordHash(hash: string, newPassword: string) {
		const passwordReset = await PasswordReset.findOne({
			where: { hash, isUsed: false },
			order: [['createdAt', 'DESC']],
		});

		if (!passwordReset) {
			throw ApiError.Custom('INVALID_RESET_CODE');
		}

		if (passwordReset.expiresAt < new Date()) {
			throw ApiError.Custom('RESET_CODE_EXPIRED');
		}

		const user = await this.Get({ id: passwordReset.userId });
		if (!user) {
			throw ApiError.Custom('USER_NOT_FOUND');
		}

		await this.Update(user.id, { password: newPassword });
		passwordReset.isUsed = true;
		await passwordReset.save();

		return true;
	}
}

export default new UserService();
