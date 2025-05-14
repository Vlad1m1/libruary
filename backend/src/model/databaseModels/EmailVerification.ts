import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface EmailVerificationCreationAttributes{
	userId: string;
	hash: boolean;
	expiresAt: Date;
}
interface EmailVerificationAttributes{
	id: string;
	userId?: string;
  	hash: boolean;
	expiresAt: Date;
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
}, {
	timestamps: false,
});

export default EmailVerification;
