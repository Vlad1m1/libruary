import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface PasswordResetCreationAttributes{
	userId: string;
	hash: string;
	expiresAt: Date;
}
interface PasswordResetAttributes{
	id: string;
	userId?: string;
  	hash: string;
	expiresAt: Date;
	isUsed: boolean;
	createdAt?: Date;
}

export interface PasswordResetInstance
  extends Model<PasswordResetAttributes, PasswordResetCreationAttributes>,
	  PasswordResetAttributes {}

const PasswordReset = sequelize.define<PasswordResetInstance>('password_reset', {
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
	isUsed: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

export default PasswordReset;
