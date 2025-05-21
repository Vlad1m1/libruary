import {Button} from "@heroui/button";
import React, {useEffect, useState} from "react";
import LanguagesTable from "@/components/LanguagesTable";
import {ILanguage} from "@/types/api/ILanguage";
import LanguageService from "@/service/LanguageService";
import {useAppSelector} from "@/hooks/redux";
import FormLanguageModal, {LanguageData} from "@/components/FormLanguageModal";
import {useDisclosure} from "@heroui/react";

const LanguagesPanel = () => {
	
	const languages = useAppSelector(state => state.languagesReducer)
	
	const getLanguages = LanguageService.getLanguages();
	const createLanguage = LanguageService.createLanguage();
	
	const {
		isOpen,
		onOpen,
		onOpenChange
	} = useDisclosure();
	
	useEffect(() => {
		getLanguages(true);
	}, []);
	
	
	const handleConfirmCreate = (data: LanguageData) => {
		createLanguage(data, true);
	}
	
	return (
		<div className="flex flex-col gap-6 items-end mt-5">
			<Button onPress={onOpen}>Добавить</Button>
			<LanguagesTable
				langs={languages}
			/>
			<FormLanguageModal
				title={"Добаввить язык"}
				confirmButtonText="добавить"
				onConfirm={handleConfirmCreate}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
			/>
		</div>
	);
};

export default LanguagesPanel;
