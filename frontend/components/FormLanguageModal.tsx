import React, {FC, FormEvent, useCallback, useEffect, useState} from 'react';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {Input} from "@heroui/input";
import { Form } from '@heroui/react';

export interface LanguageData {
	id?: string;
	code: string;
	value: string;
}

interface OwnProps {
	id?: string;
	title: string;
	confirmButtonText: string;
	onConfirm: (data: LanguageData) => void;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	defaultCodeValue?: string;
	defaultNameValue?: string;
}

const FormLanguageModal: FC<OwnProps> = (props) => {
	const {
		id,
		title,
		confirmButtonText,
		onConfirm,
		isOpen,
		onOpenChange,
		defaultCodeValue,
		defaultNameValue,
	} = props;
	
	const [codeInputValue, setCodeInputValue] = useState('');
	const [nameInputValue, setNameInputValue] = useState('');
	
	useEffect(() => {
		
		if(! isOpen) {
			return;
		}
		
		setCodeInputValue(defaultCodeValue || '');
		setNameInputValue(defaultNameValue || '');
		
	}, [isOpen]);
	
	const handleSubmit = useCallback(() => {
		if(! codeInputValue || !nameInputValue) {
			return;
		}
		onConfirm({code: codeInputValue, value: nameInputValue, id});
		handleOpenChange(false);
	},[codeInputValue, nameInputValue]);
	
	const handleOpenChange = (isOpen: boolean) => {
		if(!isOpen) {
			setNameInputValue('');
			setCodeInputValue('');
		}
		onOpenChange(isOpen);
	}
	
	return (
		<Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
						<ModalBody>
							<Form onSubmit={handleSubmit}>
								<Input
									label="Код"
									placeholder="Код, например: ru"
									variant="bordered"
									value={codeInputValue}
									onValueChange={setCodeInputValue}
									errorMessage="Поле обязательно для заполнения"
									isRequired
								/>
								<Input
									label="Название"
									placeholder="Назввание, например: Русский"
									variant="bordered"
									value={nameInputValue}
									onValueChange={setNameInputValue}
									errorMessage="Поле обязательно для заполнения"
									isRequired
								/>
							</Form>
						</ModalBody>
						<ModalFooter>
							<Button
								color={!codeInputValue || !nameInputValue ? "default" :"primary"}
								onPress={handleSubmit}
								disabled={!codeInputValue || !nameInputValue}>
								{confirmButtonText}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default FormLanguageModal;
