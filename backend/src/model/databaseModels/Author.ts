import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface AuthorCreationAttributes {
	fullname: string;
	bio: string;
	imageId?: string;
}

interface AuthorAttributes extends AuthorCreationAttributes {
	id: string;
}

export interface AuthorInstance
  extends Model<AuthorAttributes, AuthorCreationAttributes>,
	  AuthorAttributes {}

const Author = sequelize.define<AuthorInstance>('author', {
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

export default Author;
