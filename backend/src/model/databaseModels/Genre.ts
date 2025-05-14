import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface GenreCreationAttributes {
	value: string
}

interface GenreAttributes extends GenreCreationAttributes {
	id: string;
}

export interface GenreInstance
  extends Model<GenreAttributes, GenreCreationAttributes>,
	  GenreAttributes {}

const Genre = sequelize.define<GenreInstance>('genre', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	value: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Genre;
