import React, {FC, useCallback} from 'react';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {ILanguage} from "@/types/api/ILanguage";

interface OwnProps {
	id: string;
	language?: ILanguage;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onConfirm: (id: string) => void;
}

const RemoveLanguageModal: FC<OwnProps> = (props) => {
	const {
		id,
		language,
		isOpen,
		onOpenChange,
		onConfirm
	} = props;
	
	const handleSubmit = () => {
		onConfirm(id);
		onOpenChange(false);
	};
	
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">Подтвердите удаление языка "{language?.value}"</ModalHeader>
						<ModalFooter>
							<Button color="danger" variant="light" onPress={handleSubmit}>
								Удалить
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default RemoveLanguageModal;
