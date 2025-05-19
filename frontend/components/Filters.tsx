import React, {useState} from 'react';
import {Select, SelectItem} from "@heroui/select";
import {Slider, Autocomplete, AutocompleteItem} from '@heroui/react';
import RangeComponent from "@/components/UI/RangeSelect";

export const langs = [
	{key: "ru", label: "Русский"},
	{key: "en", label: "English"}
];

const Filters = () => {
	const [languages, setLanguages] = React.useState(new Set<string>([]));
	
	return (
		<div className="flex gap-[10px]">
			<Select
				className="max-w-xs"
				label="Язык"
				placeholder="Выберите язык"
				selectedKeys={languages}
				selectionMode="multiple"
				onSelectionChange={setLanguages}
			>
				{langs.map((lang) => (
					<SelectItem key={lang.key}>{lang.label}</SelectItem>
				))}
			</Select>
			<Select
				className="max-w-xs"
				label="Язык"
				placeholder="Выберите язык"
				selectedKeys={languages}
				selectionMode="multiple"
				onSelectionChange={setLanguages}
			>
				{langs.map((lang) => (
					<SelectItem key={lang.key}>{lang.label}</SelectItem>
				))}
			</Select>
			<Select
				className="max-w-xs"
				label="Жанр"
				placeholder="Выберите жанр"
				selectedKeys={languages}
				selectionMode="multiple"
				onSelectionChange={setLanguages}
			>
				{langs.map((lang) => (
					<SelectItem key={lang.key}>{lang.label}</SelectItem>
				))}
			</Select>
			<Autocomplete
				isLoading={true}
				label="Автор"
				placeholder="Начните вводить ФИО"
			>
			</Autocomplete>
		</div>
	);
};

export default Filters;
