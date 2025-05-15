import { DataTypes, Model, NOW } from 'sequelize';
import sequelize from '../db';

interface FavoriteCreationAttributes {
	userId: string;
	bookId: string;
}
interface FavoriteAttributes{
	id: string;
	userId?: string;
	bookId?: string;
	date: Date;
}

export interface FavoriteInstance
  extends Model<FavoriteAttributes, FavoriteCreationAttributes>,
	  FavoriteAttributes {}

const Favorite = sequelize.define<FavoriteInstance>('favorite', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: NOW,
	},
});

export default Favorite;
