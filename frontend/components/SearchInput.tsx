import {Input} from "@heroui/input";
import React, {FC, FormEvent} from "react";
import {SearchIcon} from "@/components/icons";

interface SearchInterface {
	label?: string;
	placeholder?: string;
	onInput?: (e: FormEvent<HTMLInputElement>) => void
}

const SearchInput:FC<SearchInterface> = (props) => {
	
	const {
		label,
		placeholder,
		onInput
	} = props
	
	return (
		<Input
			isClearable
			classNames={{
				label: "text-black/50 dark:text-white/90",
				input: [
					"text-black/90 dark:text-white/90",
					"placeholder:text-default-700/50 dark:placeholder:text-white/60",
				],
				innerWrapper: "bg-transparent",
				inputWrapper: [
					"shadow-xl",
					"bg-default-200/50",
					"dark:bg-default/60",
					"backdrop-blur-xl",
					"backdrop-saturate-200",
					"hover:bg-default-200/70",
					"dark:hover:bg-default/70",
					"group-data-[focus=true]:bg-default-200/50",
					"dark:group-data-[focus=true]:bg-default/60",
					"!cursor-text",
				],
			}}
			label={label}
			placeholder={placeholder}
			radius="lg"
			onInput={onInput}
			startContent={
				<SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
			}
		/>
	);
}

export default SearchInput;
