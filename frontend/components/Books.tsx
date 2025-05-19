import React, {FC} from 'react';
import BookCard, {IBook} from "@/components/BookCard";

interface OwnProps {
	books: IBook[];
}

const Books:FC<OwnProps> = ({books}) => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-12 ">
			{books.map((book) => (
				<BookCard book={book} key={book.id}/>
			))}
		</div>
	);
};

export default Books;
