import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface GenreCreationAttributes {
	fullname: string;
	bio: string;
}

interface GenreAttributes extends GenreCreationAttributes {
	id: string;
	imageId?: string;
}

export interface GenreInstance
  extends Model<GenreAttributes, GenreCreationAttributes>,
	  GenreAttributes {}

const Genre = sequelize.define<GenreInstance>('author', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	fullname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	bio: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Genre;
