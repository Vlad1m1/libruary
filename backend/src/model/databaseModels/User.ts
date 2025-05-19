import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface UserCreationAttributes{
	email: string;
	password: string
	firstname: string;
	lastname: string;
	patronymic: string;

}
export interface UserAttributes extends UserCreationAttributes{
	id: string;
	isVerified: boolean;
}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>('user', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	firstname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	patronymic: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isVerified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
});

export default User;
