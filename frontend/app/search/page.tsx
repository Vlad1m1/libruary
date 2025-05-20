'use client';
import { useSearchParams } from 'next/navigation'
import Filters from "@/components/Filters";
import BookCard, {IBook} from "@/components/BookCard";
import Books from "@/components/Books";

const books: IBook[] = [
	{
		id: '1',
		title: 'К себе нежно. Книга о том, как ценить и беречь себя',
		author: 'Ольга Примаченко',
		image: 'https://api.bookmate.ru/assets/books-covers/45/18/lWdpqqMs-ipad.jpeg?image_hash=3438602767d3f320510b22068da09d64',
	},
	{
		id: '2',
		title: 'Иди туда, где трудно. 7 шагов для обретения внутренней силы',
		author: 'Таэ Юн Ким',
		image: 'https://api.bookmate.ru/assets/books-covers/87/aa/Us5CywzO-ipad.jpeg?image_hash=2b08af74f838251c9f0a2c23e1548d21',
	},
	{
		id: '3',
		title: 'К себе нежно. Книга о том, как ценить и беречь себя',
		author: 'Ольга Примаченко',
		image: 'https://api.bookmate.ru/assets/books-covers/45/18/lWdpqqMs-ipad.jpeg?image_hash=3438602767d3f320510b22068da09d64',
	},
	{
		id: '4',
		title: 'Иди туда, где трудно. 7 шагов для обретения внутренней силы',
		author: 'Таэ Юн Ким',
		image: 'https://api.bookmate.ru/assets/books-covers/87/aa/Us5CywzO-ipad.jpeg?image_hash=2b08af74f838251c9f0a2c23e1548d21',
	},
	{
		id: '5',
		title: 'К себе нежно. Книга о том, как ценить и беречь себя',
		author: 'Ольга Примаченко',
		image: 'https://api.bookmate.ru/assets/books-covers/45/18/lWdpqqMs-ipad.jpeg?image_hash=3438602767d3f320510b22068da09d64',
	},
	{
		id: '6',
		title: 'Иди туда, где трудно. 7 шагов для обретения внутренней силы',
		author: 'Таэ Юн Ким',
		image: 'https://api.bookmate.ru/assets/books-covers/87/aa/Us5CywzO-ipad.jpeg?image_hash=2b08af74f838251c9f0a2c23e1548d21',
	}
]

export default function SearchPage() {
	const searchParams = useSearchParams()
	
	const search = searchParams.get('query');
	const searchResultCountText = "Найдено 6 результатов";
	return (
		<>
			<div
				className="flex items-center gap-[10px]"
			>
				<h3 className="text-2xl font-bold">{search}</h3>
				<span className="">{searchResultCountText}</span>
			</div>
			<Filters/>
			<Books books={books}/>
		</>
	);
}
