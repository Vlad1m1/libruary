import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface LanguageCreationAttributes {
	code: string;
	value: string;
}

interface LanguageAttributes{
	id: string;
	code: string;
	value: string;
}

export interface LanguageInstance
  extends Model<LanguageAttributes, LanguageCreationAttributes>,
	  LanguageAttributes {}

const Language = sequelize.define<LanguageInstance>('language', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	code: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	value: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Language;
