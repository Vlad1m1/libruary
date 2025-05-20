"use client"
import {useRouter} from "next/navigation";
import {FormEvent, useCallback, useState} from "react";
import {Input} from "@heroui/input";
import {SearchIcon} from "@/components/icons";
import {set} from "react-hook-form";


const SearchInput = () => {
	
	const router = useRouter();
	const [query, setQuery] = useState('');
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push('/search?query=' + query);
	}, [query]);

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full"
		>
			<Input
				name="search"
				enterKeyHint="search"
				type="search"
				aria-label="Search"
				role="combobox"
				autoComplete="off"
				autoCorrect="off"
				classNames={{
					inputWrapper: "bg-default-100",
					input: "text-sm",
				}}
				onValueChange={setQuery}
				labelPlacement="outside"
				placeholder="Поиск по книгам, авторам, исследованиям и исследовтелям"
				startContent={
					<SearchIcon
						className="text-base text-default-400 pointer-events-none flex-shrink-0"
					/>
				}
			/>
		</form>
	)
}

export default SearchInput;
