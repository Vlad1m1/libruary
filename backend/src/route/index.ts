import express from 'express';
import AuthRoute from './auth.route';
import LanguageRoute from './language.route';
import GenreRoute from './genre.route';
import ImageRoute from './image.route';
import AuthorRoute from './author.route';
import FileRoute from './file.route';
import BookRoute from './book.route';
import SearchRoute from './search.route';

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/languages', LanguageRoute);
router.use('/genres', GenreRoute);
router.use('/images', ImageRoute);
router.use('/authors', AuthorRoute);
router.use('/files', FileRoute);
router.use('/books', BookRoute);
router.use('/search', SearchRoute);

export default router;
