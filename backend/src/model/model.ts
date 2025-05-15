import Token from './databaseModels/Token';
import User from './databaseModels/User';
import Permission from './databaseModels/Permission';
import PermissionToUser from './databaseModels/PermissionToUser';
import PasswordReset from './databaseModels/PasswordReset';
import EmailVerification from './databaseModels/EmailVerification';
import Book from './databaseModels/Book';
import Language from './databaseModels/Language';
import File from './databaseModels/File';
import Image from './databaseModels/Image';
import Genre from './databaseModels/Genre';
import BookToGenre from './databaseModels/BookToGenre';
import Author from './databaseModels/Author';
import BookToAuthor from './databaseModels/BookToAuthor';
import Download from './databaseModels/Download';
import Favorite from './databaseModels/Favorite';

User.hasMany(Token);
Token.belongsTo(User);

User.hasMany(PasswordReset);
PasswordReset.belongsTo(User);

User.hasMany(EmailVerification);
EmailVerification.belongsTo(User);

User.belongsToMany(Permission, {
	through: PermissionToUser,
});
Permission.belongsToMany(User, {
	through: PermissionToUser,
});

Language.hasMany(Book);
Book.belongsTo(Language);

File.hasMany(Book);
Book.belongsTo(File);

Image.hasMany(Book);
Book.belongsTo(Image);

Book.belongsToMany(Genre, {
	through: {
		model: BookToGenre,
		unique: false,
	},
	foreignKey: 'bookId',
	otherKey: 'genreId',
});

Genre.belongsToMany(Book, {
	through: {
		model: BookToGenre,
		unique: false,
	},
	foreignKey: 'genreId',
	otherKey: 'bookId',
});

Book.belongsToMany(Author, {
	through: {
		model: BookToAuthor,
		unique: false,
	},
	foreignKey: 'bookId',
	otherKey: 'authorId',
});

Author.belongsToMany(Book, {
	through: {
		model: BookToAuthor,
		unique: false,
	},
	foreignKey: 'authorId',
	otherKey: 'bookId',
});

Image.hasMany(Author);
Author.belongsTo(Image);

User.belongsToMany(Book, {
	through: {
		model: Download,
		unique: false,
	},
	foreignKey: 'userId',
	otherKey: 'bookId',
});

Book.belongsToMany(User, {
	through: {
		model: Download,
		unique: false,
	},
	foreignKey: 'bookId',
	otherKey: 'userId',
});

User.belongsToMany(Book, {
	through: {
		model: Favorite,
		unique: false,
	},
	foreignKey: 'userId',
	otherKey: 'bookId',
});

Book.belongsToMany(User, {
	through: {
		model: Favorite,
		unique: false,
	},
	foreignKey: 'bookId',
	otherKey: 'userId',
});

export {
	Token,
	User,
	Permission,
	PermissionToUser,
	PasswordReset,
	EmailVerification,
	Book,
	Language,
	File,
	Image,
	Genre,
	BookToGenre,
	Author,
	BookToAuthor,
	Download,
	Favorite,
};
