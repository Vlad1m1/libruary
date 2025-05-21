import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure} from "@heroui/react";
import {ILanguage} from "@/types/api/ILanguage";
import {FC, useCallback, useState} from "react";
import {EyeIcon} from "@heroui/shared-icons";
import {DeleteIcon, EditIcon} from "@/components/icons";
import RemoveLanguageModal from "@/components/RemoveLanguageModal";
import EditLanguageModal, {LanguageData} from "@/components/FormLanguageModal";
import FormLanguageModal from "@/components/FormLanguageModal";
import LanguageService from "@/service/LanguageService";

const columns = [
	{name: "Язык", uid: "language"},
	{name: "Действие", uid: "actions"},
];

interface OwnProps {
	langs: ILanguage[];
}

const LanguagesTable: FC<OwnProps> = (props) => {
	const {langs} = props;
	
	const [pickedLanguage, setPickedLanguage] = useState<ILanguage>();
	
	const updateLanguages = LanguageService.updateLanguages();
	const deleteLanguages = LanguageService.deleteLanguage();
	
	const {
		isOpen: isRemoveModalOpen,
		onOpen: onRemoveModalOpen,
		onOpenChange: onRemoveModalOpenChange
	} = useDisclosure();
	
	const {
		isOpen: isEditModalOpen,
		onOpen: onEditModalOpen,
		onOpenChange: onEditModalOpenChange
	} = useDisclosure();
	
	
	const handleDeleteClick = (language: ILanguage) => {
		setPickedLanguage(language);
		onRemoveModalOpen();
	}
	
	const handleEditClick = (language: ILanguage) => {
		setPickedLanguage(language);
		onEditModalOpen();
	}
	
	const handleConfirmEdit = (data: LanguageData) => {
		updateLanguages(data as Pick<ILanguage, 'id' | 'value' | 'code'>, true);
	}
	
	const handleConfirmDelete = (id: string) => {
		deleteLanguages({id}, true);
	}
	
	const renderCell = useCallback((lang: ILanguage, columnKey: string | number) => {
		
		switch (columnKey) {
			case "language":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize text-default-400">{lang.value}</p>
					</div>
				);
			case "actions":
				return (
					<div className="relative flex items-center justify-center gap-2">
						<div onClick={() => handleEditClick(lang)}>
							<Tooltip content="Редактировать">
							  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<EditIcon />
							  </span>
							</Tooltip>
						</div>
						<div onClick={() => handleDeleteClick(lang)}>
							<Tooltip color="danger" content="Удалить">
							  <span className="text-lg text-danger cursor-pointer active:opacity-50">
								<DeleteIcon />
							  </span>
							</Tooltip>
						</div>
					</div>
				);
		}
	}, []);
	
	return (
		<>
			<Table aria-label="Example table with custom cells">
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={langs}>
					{(lang) => (
						<TableRow key={lang.id}>
							{(columnKey) => <TableCell>{renderCell(lang, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
			<RemoveLanguageModal
				id={pickedLanguage?.id || ''}
				onConfirm={handleConfirmDelete}
				language={pickedLanguage}
				isOpen={isRemoveModalOpen}
				onOpenChange={onRemoveModalOpenChange}
			/>
			<FormLanguageModal
				id={pickedLanguage?.id || ''}
				defaultCodeValue={pickedLanguage?.code || ''}
				defaultNameValue={pickedLanguage?.value || ''}
				title={"Редактирование языка " + pickedLanguage?.value}
				confirmButtonText="Сохранить"
				onConfirm={handleConfirmEdit}
				isOpen={isEditModalOpen}
				onOpenChange={onEditModalOpenChange}
			/>
		</>
	);
};

export default LanguagesTable;
