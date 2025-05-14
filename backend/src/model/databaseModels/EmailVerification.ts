import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface EmailVerificationCreationAttributes{
	userId: string;
	hash: string;
	expiresAt: Date;
}
interface EmailVerificationAttributes{
	id: string;
	userId?: string;
  	hash: string;
	expiresAt: Date;
	createdAt?: Date;
}

export interface EmailVerificationInstance
  extends Model<EmailVerificationAttributes, EmailVerificationCreationAttributes>,
	  EmailVerificationAttributes {}

const EmailVerification = sequelize.define<EmailVerificationInstance>('email_verification', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	hash: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	expiresAt: {
		type: DataTypes.DATE,
		allowNull: false,
	},
});

export default EmailVerification;
