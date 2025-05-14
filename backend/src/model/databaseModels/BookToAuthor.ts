import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

interface BookToAuthorCreationAttributes {
	authorId: string;
	bookId: string;
}
interface BookToAuthorAttributes{
	id: string;
	authorId?: string;
	bookId?: string;
}

export interface BookToAuthorInstance
  extends Model<BookToAuthorAttributes, BookToAuthorCreationAttributes>,
	  BookToAuthorAttributes {}

const BookToAuthor = sequelize.define<BookToAuthorInstance>('book_to_author', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUIDV4,
	},
},
{
	timestamps: false,
});

export default BookToAuthor;
