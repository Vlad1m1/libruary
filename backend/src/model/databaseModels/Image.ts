import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface ImageCreationAttributes {
	path: string;
}

interface ImageAttributes extends ImageCreationAttributes {
	id: string;
}

export interface ImageInstance
  extends Model<ImageAttributes, ImageCreationAttributes>,
	  ImageAttributes {}

const Image = sequelize.define<ImageInstance>('image', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	path: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default Image;
