import React, {Dispatch, FC, FormEvent, SetStateAction, useEffect, useState} from 'react';
import {Select, SelectItem} from "@heroui/select";
import {Autocomplete, AutocompleteItem, Avatar} from '@heroui/react';
import {ILanguage} from "@/types/api/ILanguage";
import LanguageService from "@/service/LanguageService";
import GenreService from "@/service/GenreService";
import {IGenre} from "@/types/api/IGenre";
import {IAuthor} from "@/types/api/IAuthor";
import AuthorService from "@/service/AuthorService";
import {Button} from "@heroui/button";
import ImageService from "@/service/ImageService";
import Link from "next/link";
import useThrottle from "@/hooks/useThrottle";

interface Filters {
	lang: Set<string>;
	genre: Set<string>
}

interface OwnProps {
	filters: Filters;
	setFilters: Dispatch<SetStateAction<Filters>>
}

const Filters:FC<OwnProps> = (props) => {
	const {
		filters,
		setFilters
	} = props;
	
	const [languages, setLanguages] = React.useState<ILanguage[]>([]);
	const [genres, setGenres] = React.useState<IGenre[]>([]);
	const [authors, setAuthors] = React.useState<IAuthor[]>([]);
	
	const [load, setLoad] = useState({
		lang: true,
		genre: true,
		author: false,
	})
	
	useEffect(() => {
		LanguageService.get().then((data) => {
			setLanguages(data.data);
			setLoad(state => ({...state, lang: false}));
		});
		
		GenreService.get().then((data) => {
			setGenres(data.data);
			setLoad(state => ({...state, genre: false}));
		});
		
		
	}, [])
	
	const handleSetLanguageFilter = (newSelection: Set<string>) => {
		setFilters((filters => ({...filters, lang: newSelection})))
	}
	
	const handleSetGenreFilter = (newSelection: Set<string>) => {
		setFilters((filters => ({...filters, genre: newSelection})))
	}
	
	const handleAuthorsSearch = (value: string) => {
		if(! value.length) {
			setAuthors([]);
			return;
		}
		setLoad(state => ({...state, author: true}));
		AuthorService.search(value).then(data => {
			setAuthors(data.data);
			setLoad(state => ({...state, author: false}));
		})
	}
	
	const trottledAuthorSearch = useThrottle(handleAuthorsSearch, 1500);
	
	return (
		<div className="flex gap-[10px]">
			<Select
				className="max-w-xs"
				label="Язык"
				placeholder="Выберите язык"
				selectedKeys={filters.lang}
				selectionMode="multiple"
				// @ts-ignore
				onSelectionChange={handleSetLanguageFilter}
				isLoading={load.lang}
				disabled={load.lang}
			>
				{languages.map((lang) => (
					<SelectItem key={lang.id}>{lang.value}</SelectItem>
				))}
			</Select>
			{/*<Select*/}
			{/*	className="max-w-xs"*/}
			{/*	label="Язык"*/}
			{/*	placeholder="Выберите язык"*/}
			{/*	selectedKeys={languages}*/}
			{/*	selectionMode="multiple"*/}
			{/*	onSelectionChange={setLanguages}*/}
			{/*>*/}
			{/*	{langs.map((lang) => (*/}
			{/*		<SelectItem key={lang.key}>{lang.label}</SelectItem>*/}
			{/*	))}*/}
			{/*</Select>*/}
			<Select
				className="max-w-xs"
				label="Жанр"
				placeholder="Выберите жанр"
				selectedKeys={filters.genre}
				selectionMode="multiple"
				//@ts-ignore
				onSelectionChange={handleSetGenreFilter}
				isLoading={load.genre}
			>
				{genres.map((lang) => (
					<SelectItem key={lang.id}>{lang.value}</SelectItem>
				))}
			</Select>
			<Autocomplete
				aria-label="Select an employee"
				defaultItems={authors}
				listboxProps={{
					hideSelectedIcon: true,
					itemClasses: {
						base: [
							"rounded-medium",
							"text-default-500",
							"transition-opacity",
							"data-[hover=true]:text-foreground",
							"dark:data-[hover=true]:bg-default-50",
							"data-[pressed=true]:opacity-70",
							"data-[hover=true]:bg-default-200",
							"data-[selectable=true]:focus:bg-default-100",
							"data-[focus-visible=true]:ring-default-500",
						],
					},
				}}
				placeholder="Введите имя автора"
				label="Автор"
				onInputChange={trottledAuthorSearch}
				isLoading={load.author}
			>
				{(item) => (
					<AutocompleteItem key={item.id} textValue={item.fullname}>
						<div className="flex justify-between items-center">
							<div className="flex gap-2 items-center">
								<Avatar alt={item.fullname} className="flex-shrink-0" size="sm" src={ImageService.getURL(item.imageId)} />
								<div className="flex flex-col">
									<span className="text-tiny text-default-400">{item.fullname}</span>
								</div>
							</div>
							<Link
								href={`/author/${item.id}`}
								target="_blank"
								className="mr-0.5"
							>
								Перейти
							</Link>
						</div>
					</AutocompleteItem>
				)}
			</Autocomplete>
		</div>
	);
};

export default Filters;
