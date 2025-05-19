import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface BookToGenreCreationAttributes {
	genreId: string;
	bookId: string;
}
interface BookToGenreAttributes{
	id: string;
	authorId?: string;
	bookId?: string;
}

export interface BookToGenreInstance
  extends Model<BookToGenreAttributes, BookToGenreCreationAttributes>,
	  BookToGenreAttributes {}

const BookToGenre = sequelize.define<BookToGenreInstance>('book_to_genre', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
},
{
	timestamps: false,
});

export default BookToGenre;
