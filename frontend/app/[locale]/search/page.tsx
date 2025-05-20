'use client';
import { useSearchParams } from 'next/navigation'
import Filters from "@/components/Filters";
import Books from "@/components/Books";
import {useEffect, useState} from "react";
import BookService from "@/service/BookService";
import ImageService from "@/service/ImageService";
import {IBook} from "@/types/api/IBook";


export default function SearchPage() {
	const searchParams = useSearchParams()
	
	const query = searchParams.get('query');
	
	const [books, setBooks] = useState<IBook[]>([]);
	
	const [filters, setFilters] = useState<Filters>({
		lang: new Set(),
		genre: new Set(),
	})
	
	useEffect(() => {
		if(!query) return;
		
		BookService.search(query).then(data => {
			setBooks(data.data);
		})
	}, [query]);
	
	return (
		<>
			<div
				className="flex items-center gap-[10px]"
			>
				<h3 className="text-2xl font-bold">{query}</h3>
				<span className="">Найдено 6 результатов</span>
			</div>
			<Filters
				filters={filters}
				setFilters={setFilters}
			/>
			<Books
				books={books.map(book => ({id: book.id, title: book.title, author: book.authors.join(','), image: ImageService.getURL(book.imageId)}))}
			/>
		</>
	);
}
