import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface BookCreationAttributes {
	title: string;
	annotation: string;
	year: number;
}
interface BookAttributes{
	id: string;
	title: string;
	annotation: string;
	year: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface BookInstance
  extends Model<BookAttributes, BookCreationAttributes>,
	  BookAttributes {}

const Book = sequelize.define<BookInstance>('book', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	annotation: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	year: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

export default Book;
