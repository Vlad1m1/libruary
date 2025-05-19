import React, {FC} from 'react';
import {Image} from "@heroui/image";
import {Divider} from "@heroui/divider";
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Badge} from "@heroui/badge";
import {Link} from "@heroui/link";
import {Button} from "@heroui/button";

export interface IBook {
	id: string;
	title: string;
	author: string;
	image: string
}

interface OwnProps {
	book: IBook;
	
}

const BookCard:FC<OwnProps> = ({book}) => {
	const {
		title,
		author,
		image,
	} = book;
	return (
		<div
			className="max-w-[200px] w-fit flex flex-col gap-1 mt-[10px]"
		>
			<Image
				alt={title}
				className="w-full object-cover h-[300px]"
				radius="sm"
				shadow="sm"
				src={image}
			/>
			<div className="mt-2.5">
				<p className="text-default-500 text-xs truncate">{author}</p>
				<b className="text-sm break-words line-clamp-2">{title}</b>
			</div>
		</div>
	);
};

export default BookCard;
