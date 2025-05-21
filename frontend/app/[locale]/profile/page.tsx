"use client"
import {Tab, Tabs} from "@heroui/tabs";
import {FaBook, FaHeart, FaUserAlt, FaUserGraduate} from "react-icons/fa";
import {LuLanguages} from "react-icons/lu";
import {FaMasksTheater} from "react-icons/fa6";
import {IoMdDownload} from "react-icons/io";
import LanguagesPanel from "@/components/LanguagesPanel";

export default function ProfilePage() {
	
  return (
    <div>
		<Tabs aria-label="Options" color="primary" variant="bordered">
			<Tab
				key="downloaded"
				title={
					<div className="flex items-center space-x-2">
						<IoMdDownload />
						<span>Скачанное</span>
					</div>
				}
			>
			123
			</Tab>
			<Tab
				key="favorites"
				title={
					<div className="flex items-center space-x-2">
						<FaHeart />
						<span>Избранное</span>
					</div>
				}
			/>
			<Tab
				key="books"
				title={
					<div className="flex items-center space-x-2">
						<FaBook />
						<span>Книги</span>
					</div>
				}
			/>
			<Tab
				key="authors"
				title={
					<div className="flex items-center space-x-2">
						<FaUserGraduate />
						<span>Авторы</span>
					</div>
				}
			/>
			<Tab
				key="genres"
				title={
					<div className="flex items-center space-x-2">
						<FaMasksTheater />
						<span>Жарны</span>
					</div>
				}
			/>
			<Tab
				key="languages"
				title={
					<div className="flex items-center space-x-2">
						<LuLanguages />
						<span>Языки</span>
					</div>
				}
			>
				<LanguagesPanel/>
			</Tab>
			<Tab
				key="users"
				title={
					<div className="flex items-center space-x-2">
						<FaUserAlt />
						<span>Пользователи</span>
					</div>
				}
			/>
		</Tabs>
    </div>
	);
}
